const archiver = require("archiver");
const { exportPDf, exportExcel } = require("../export/exportPenilaian");
const ElementUji = require("../models/ElementUji");
const Jurusan = require("../models/Jurusan");
const Klaster = require("../models/Klaster");
const Penilaian = require("../models/Penilaian");
const Siswa = require("../models/Siswa");
const fs = require("fs");
const { Op } = require("sequelize");
const User = require("../models/User");

class PenilaianController {
  // index method
  static index = async (req, res) => {
    const query =
      Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      if (query.tingkatan == null) throw new Error("Filter Data Error");

      // Retrieve data from the database based on the query parameters
      const result = await Siswa.findAll({
        where: {
          id_penguji: req.session.user.id,
          tingkatan: query?.tingkatan,
          no_kelas: query?.no_kelas,
          nama: {
            [Op.like]: `%${query?.s}%`,
          },
        },
        attributes: { exclude: ["id_jurusan"] },
        include: [
          { model: User },
          {
            model: Penilaian,
            where: { id_klaster: query["id_klaster"] },
            attributes: ["status", "catatan", "id", "simpan_permanen"],
            include: [
              { model: Klaster, attributes: { exclude: ["id_jurusan"] } },
              { model: ElementUji, attributes: { exclude: ["id_klaster"] } },
            ],
          },
        ],
      });

      // Return the retrieved data as a JSON response
      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {
      console.log(error);
      res.status(200).json("error");
    }
  };

  // store method
  static store = async (req, res) => {
    const all = Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    let id = all?.id;
    delete all.id;
    console.log("errer");
    try {
      // Update the Penilaian record in the database with the provided data
      const result = await Penilaian.update(
        {
          status: all["status"],
          catatan: all["catatan"],
          simpan_permanen: all["simpan_permanen"],
        },
        { where: { id: id } }
      );

      // Return the updated data as a JSON response
      res.status(200).json({ message: "data berhasil di update ", data: all });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error ", data: error });
    }
  };

  // show method
  static show = async (req, res) => {
    const { id } = req.params;
    try {
      // Find a specific Penilaian record in the database and include related models
      const result = await Penilaian.findOne({
        attributes: ["status"],
        include: [
          { model: Siswa, attributes: { exclude: ["id_jurusan"] } },
          { model: Klaster, attributes: { exclude: ["id_jurusan"] } },
          { model: ElementUji, attributes: { exclude: ["id_klaster"] } },
        ],
        where: { id: id },
      });

      // Return the found data as a JSON response
      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {
      // Handle any errors that occur during the process
    }
  };

  // update method
  static update = async (req, res) => {
    const { id } = req.params;
    const all = Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      // Update the Penilaian record in the database with the provided data
      const result = await Penilaian.update(all, { where: { id: id } });

      // Return the updated data as a JSON response
      res.status(200).json({ message: "data berhasil di ubah", data: result });
    } catch (error) {
      // Handle any errors that occur during the process
    }
  };

  static export = async (req, res) => {
    const query =
      Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      // Retrieve data from the database based on the query parameters
      const result = await Siswa.findAll({
        where: {
          tingkatan: query?.tingkatan,
          no_kelas: query?.no_kelas,
          id_penguji: req.session.user.id,
        },

        attributes: { exclude: ["id_jurusan"] },
        include: [
          {
            model: Jurusan,
          },
          { model: User },
          {
            model: Penilaian,
            where: { id_klaster: query["id_klaster"] },
            attributes: ["status", "id", "catatan"],
            include: [
              { model: Klaster, attributes: { exclude: ["id_jurusan"] } },
              { model: ElementUji, attributes: { exclude: ["id_klaster"] } },
            ],
          },
        ],
      });

      if (result.length == 0) {
        console.log(result.length);
        res
          .status(200)
          .json({ message: "data tidak ditemukan", data: null, status: 401 });
      } else {
        if (query["mode"] == "excel") {
          // Export data as PDF
          await exportExcel(result, res);
        } else {
          await exportPDf(result, res);
          // Export data as Excel
        }
      }
      // mengirim downloatan
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  };

  static siapkan = async (req, res) => {
    const all = Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      // Count the number of Siswa records that match the provided criteria
      let count = await Siswa.count({
        where: {
          tingkatan: all["tingkatan"],
          no_kelas: all["no_kelas"],
          id_penguji: req.session.user.id,
        },
        include: {
          model: Penilaian,
          where: { id_klaster: all["id_klaster"] },
        },
      });

      // Find Siswa and ElementUji records based on the provided criteria
      let siswa = await Siswa.findAll({
        where: {
          id_penguji: req.session.user.id,
          tingkatan: all["tingkatan"],
          no_kelas: all["no_kelas"],
          jurusan_id: all["id_jurusan"],
        },
      });
      let element = await ElementUji.findAll({
        where: {
          deleted_at: null,
          id_klaster: all["id_klaster"],
        },
      });

      console.log(siswa);
      if (count == 0) {
        // If no Penilaian records exist for the given criteria, create new ones
        for (let i = 0; i < siswa.length; i++) {
          for (let j = 0; j < element.length; j++) {
            const result = await Penilaian.create({
              id_siswa: siswa[i].id,
              id_klaster: all["id_klaster"],
              id_element_uji: element[j].id,
            });
          }
        }
        res.status(200).json({ message: "data sudah di filter", data: null });
      } else {
        res.status(200).json({ message: "data tidak ditemukan ", data: null });
      }
    } catch (error) {
      res.status(200).json({ message: "Server error ", data: error });
    }
  };
}

module.exports = PenilaianController;

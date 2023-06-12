const { Op, Sequelize } = require("sequelize");
const Jurusan = require("../models/Jurusan");
const Siswa = require("../models/Siswa");
const XLSX = require("xlsx");
const db = require("../database/db");
const User = require("../models/User");

class SiswaController {
  // index method
  static index = async (req, res) => {
    const query =
      Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    try {
      const result = await Siswa.findAll({
        order: [["nama", "asc"]],
        where: {
          deleted_at: null,
          tingkatan: query?.tingkatan,
          no_kelas: query?.no_kelas,
          jurusan_id: query?.jurusan_id,
          [Op.and]: db.where(db.fn("YEAR", Sequelize.col("created_at")), year),
        },
        attributes: { exclude: ["id_jurusan"] },
        include: Jurusan,
      });

      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  static count = async (req, res) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    try {
      const result = await Siswa.count({
        where: {
          deleted_at: null,
          [Op.and]: db.where(db.fn("YEAR", Sequelize.col("created_at")), year),
        },
      });

      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {
      console.log(error);
    }
  };

  // store method

  static store = async (req, res) => {
    const all = Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      const result = await Siswa.create(all);
      res
        .status(200)
        .json({ message: "data berhasil di tambahkan", data: result });
    } catch (error) {}
  };

  // show method

  static show = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Siswa.findOne({
        attributes: { exclude: "jurusan_id" },

        include: [{ model: Jurusan }],
        where: { id: id },
      });
      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {}
  };

  // update method

  static update = async (req, res) => {
    const { id } = req.params;
    const all = Object.keys(req.body).length > 0 ? req.body : null ?? req.query;
    try {
      const result = await Siswa.update(all, { where: { id: id } });
      res.status(200).json({ message: "data berhasil di ubah", data: result });
    } catch (error) {}
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      let now = new Date();
      const result = await Siswa.update(
        { deleted_at: now },
        { where: { id: id } }
      );
      console.log(now);
      res.status(200).json({ message: "data berhasil di hapus", data: result });
    } catch (error) {
      console.log(error);
    }
  };

  static import = async (req, res) => {
    try {
      const filePath = req.file.path;

      // Baca file Excel menggunakan library xlsx
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      let header = jsonData[0];
      // Proses data Excel yang diimpor
      const values = await Promise.all(
        jsonData.map(async (row, i) => {
          if (i !== 0) {
            let data = {};
            for (const key in header) {
              data[header[key].replace(" ", "_")] = row[key];
            }
            const { nama, nisn, tingkatan, no_kelas, jurusan, penguji } = data;
            let jurusanData = await Jurusan.findOne({
              where: {
                [Op.or]: [
                  { nama: jurusan.trim() }, // Condition 1: Trimmed nama matches jurusan
                  { id: jurusan }, // Condition 2: id matches jurusan
                ],
              },
            });

            if (nama && nisn && tingkatan && jurusan && penguji) {
              throw new Error("Terdapat Data Yang Kosong");
            }
            if (!jurusanData) {
              throw new Error(jurusan); // Melempar exception dengan pesan
              // return jurusan.trim();
            }
            let pengujiData = await User.findOne({
              where: { nama: penguji.trim() },
            });
            if (!pengujiData) {
              throw new Error(pengujiData); // Melempar exception dengan pesan
              // return jurusan.trim();
            }
            let ada = await Siswa.count({
              where: {
                nisn: nisn,
                nama: nama.trim(),
                jurusan_id: jurusanData?.id,
                tingkatan: tingkatan,
                no_kelas: no_kelas,
                id_penguji: pengujiData.id,
              },
            });
            if (ada === 0)
              return {
                nisn: nisn,
                nama: nama.trim(),
                jurusan_id: jurusanData?.id,
                tingkatan: tingkatan,
                no_kelas: no_kelas,
                id_penguji: pengujiData.id,
              };
          }
          return null;
        })
      );
      const filteredValues = values.filter((value) => value !== null);

      Siswa.bulkCreate(filteredValues);
      res.status(200).send("File berhasil diunggah dan diproses");
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .send("Terjadi kesalahan saat mengunggah dan memproses file " + error);
    }
  };
}

module.exports = SiswaController;

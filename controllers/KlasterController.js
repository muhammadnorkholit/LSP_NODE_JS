const { Op, Sequelize } = require("sequelize");
const Jurusan = require("../models/Jurusan");
const Klaster = require("../models/Klaster");
const db = require("../database/db");

class KlasterController {
  // index method
  static index = async (req, res) => {
    try {
      const result = await Klaster.findAll({
        where: { deleted_at: null },
        // attributes: { exclude: ["id_jurusan"] },
        include: Jurusan,
      });
      res
        .status(200)
        .json({ message: "data berhasil di dapatkan", data: result });
    } catch (error) {}
  };

  static count = async (req, res) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    try {
      const result = await Klaster.count({
        where: {
          deleted_at: null,
          tahun: year,
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
      const result = await Klaster.create(all);
      res
        .status(200)
        .json({ message: "data berhasil di tambahkan", data: result });
    } catch (error) {}
  };

  // show method

  static show = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Klaster.findOne({
        attributes: { exclude: ["id_jurusan"] },
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
      const result = await Klaster.update(all, { where: { id: id } });
      res.status(200).json({ message: "data berhasil di ubah", data: result });
    } catch (error) {}
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      let now = new Date();
      const result = await Klaster.update(
        { deleted_at: now },
        { where: { id: id } }
      );
      console.log(now);
      res.status(200).json({ message: "data berhasil di hapus", data: result });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = KlasterController;

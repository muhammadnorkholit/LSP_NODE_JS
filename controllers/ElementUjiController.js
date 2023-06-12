const ElementUji = require("../models/ElementUji");
const Klaster = require("../models/Klaster");
const XLSX = require("xlsx");

class ElementUjiController {
  // index method
  static index = async (req, res) => {
    try {
      const result = await ElementUji.findAll({
        where: { deleted_at: null },
        order: [["id", "desc"]],
        attributes: { exclude: ["id_klaster"] },
        include: [{ model: Klaster, attributes: { exclude: ["id_jurusan"] } }],
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
      const result = await ElementUji.create(all);
      res
        .status(200)
        .json({ message: "data berhasil di tambahkan", data: result });
    } catch (error) {}
  };

  // show method

  static show = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ElementUji.findOne({
        attributes: { exclude: ["id_klaster"] },
        include: [{ model: Klaster, attributes: { exclude: ["id_jurusan"] } }],
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
      const result = await ElementUji.update(all, { where: { id: id } });
      res.status(200).json({ message: "data berhasil di ubah", data: result });
    } catch (error) {}
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      let now = new Date();
      const result = await ElementUji.update(
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
      const { id_klaster } =
        Object.keys(req.body).length > 0 ? req.body : null ?? req.query;

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
            const { nama, kode_unit } = data;
            let ada = await ElementUji.count({
              where: { nama: nama, kode_unit: kode_unit },
            });
            if (ada === 0) {
              let klaster = await Klaster.findOne({
                where: { id: id_klaster },
              });

              return {
                nama: nama.trim(),
                kode_unit: kode_unit,
                id_klaster: klaster?.id,
              };
            }
          }
          return null;
        })
      );

      const filteredValues = values.filter((value) => value !== null);
      ElementUji.bulkCreate(filteredValues);
      res.status(200).send("File berhasil diunggah dan diproses");
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .send("Terjadi kesalahan saat mengunggah dan memproses file");
    }
  };
}

module.exports = ElementUjiController;

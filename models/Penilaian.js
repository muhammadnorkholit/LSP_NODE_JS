const {
  Sequelize,
  INTEGER,
  STRING,
  ENUM,
  DATE,
  TEXT,
  TINYINT,
} = require("sequelize");
let db = require("../database/db");
const Klaster = require("./Klaster");
const Siswa = require("./Siswa");
const ElementUji = require("./ElementUji");

const Penilaian = db.define(
  "penilaian",
  {
    id_element_uji: INTEGER,
    id_klaster: INTEGER,
    id_siswa: INTEGER,
    deleted_at: DATE,
    catatan: TEXT,
    status: ENUM(["kompeten", "belum kompeten"]),
    simpan_permanen: TINYINT,
  },
  { freezeTableName: true, timestamps: false }
);

Penilaian.belongsTo(Klaster, {
  foreignKey: "id_klaster",
});

// Penilaian.belongsTo(Siswa, {
//   foreignKey: "id_siswa",
// });
Penilaian.belongsTo(ElementUji, {
  foreignKey: "id_element_uji",
});
module.exports = Penilaian;

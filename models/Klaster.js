const { Sequelize, INTEGER, STRING, DATE } = require("sequelize");
let db = require("../database/db");
const Jurusan = require("./Jurusan");

const Klaster = db.define(
  "klaster",
  {
    klaster: STRING,
    kompetensi_keahlian: STRING,
    id_jurusan: INTEGER,
    tahun: STRING,
    deleted_at: DATE,
  },
  { freezeTableName: true, timestamps: false }
);

Klaster.belongsTo(Jurusan, {
  foreignKey: "id_jurusan",
});
module.exports = Klaster;

const { Sequelize, INTEGER, STRING, DATE } = require("sequelize");
let db = require("../database/db");
const Klaster = require("./Klaster");

const ElementUji = db.define(
  "element_uji",
  {
    nama: STRING,
    kode_unit: STRING,
    id_klaster: INTEGER,
    deleted_at: DATE,
  },
  { freezeTableName: true, timestamps: false }
);

ElementUji.belongsTo(Klaster, {
  foreignKey: "id_klaster",
});
module.exports = ElementUji;

const { Sequelize, STRING, DATE } = require("sequelize");
let db = require("../database/db");

const Jurusan = db.define(
  "jurusan",
  {
    nama: STRING,
    deleted_at: DATE,
    kode: STRING,
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Jurusan;

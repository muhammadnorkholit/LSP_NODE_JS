const { Sequelize, STRING, DATE, INTEGER } = require("sequelize");
let db = require("../database/db");

const User = db.define(
  "user",
  {
    nama: STRING,
    username: STRING,
    password: STRING,
    id_jurusan: INTEGER,
    // deleted_at: DATE,
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = User;

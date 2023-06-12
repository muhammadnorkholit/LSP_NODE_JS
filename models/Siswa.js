const { Sequelize, INTEGER, STRING, DATE } = require("sequelize");
let db = require("../database/db");
const Jurusan = require("./Jurusan");
const Penilaian = require("./Penilaian");
const User = require("./User");

const Siswa = db.define(
  "siswa",
  {
    id: { type: INTEGER, primaryKey: true },
    nama: STRING,
    no_kelas: INTEGER,
    tingkatan: STRING,
    jurusan_id: INTEGER,
    nisn: INTEGER,
    status: STRING,
    id_penguji: INTEGER,
    deleted_at: DATE,
  },
  { freezeTableName: true, timestamps: false }
);

Siswa.belongsTo(Jurusan, {
  foreignKey: "jurusan_id",
});

Siswa.hasMany(Penilaian, {
  foreignKey: "id_siswa",
});
Siswa.belongsTo(User, {
  foreignKey: "id_penguji",
});

module.exports = Siswa;

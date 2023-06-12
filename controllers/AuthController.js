const ElementUji = require("../models/ElementUji");
const Klaster = require("../models/Klaster");
const XLSX = require("xlsx");
const User = require("../models/User");
const bcrypt = require("bcrypt");
class Auth {
  // index method
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Cari pengguna dengan username yang sesuai
      const user = await User.findOne({ where: { username: username } });

      const passwordd = "password";
      if (user) {
        // Periksa kecocokan password menggunakan bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            // Login berhasil
            user.setDataValue("password", null);
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.status(200).json({
              message: "berhasil login",
              data: user,
              s: req.session.isLoggedIn,
            });
          } else {
            // Login gagal
            res.json("Login gagal. Silakan coba lagi. password salah");
          }
        });
      } else {
        // Login gagal
        res.json("Login gagal. Silakan coba lagi. username tidak ditemukan");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // store method
}

module.exports = Auth;

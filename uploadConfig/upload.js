const multer = require("multer");
// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan direktori penyimpanan file
    cb(null, "ImportFile/");
  },
  filename: function (req, file, cb) {
    // Tentukan nama file yang akan disimpan
    cb(null, file.originalname);
  },
});

// Buat middleware multer dengan konfigurasi
const upload = multer({ storage: storage });
module.exports = upload;

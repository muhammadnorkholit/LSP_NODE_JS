const express = require("express");
const PenilaianController = require("../controllers/PenilaianController");
const router = express.Router();
const fs = require("fs");
router.get("/", PenilaianController.index);
router.post("/", PenilaianController.store);
router.post("/siapkan", PenilaianController.siapkan);
router.get("/:id", PenilaianController.show);
router.put("/:id", PenilaianController.update);
router.post("/export", PenilaianController.export);
// router.get("/s/download", (req, res) => {
//   let zipFilePath = "export/file/REKAYASA_PERANGKAT_LUNAK.zip";

//   // Set the appropriate headers for the response
//   res.setHeader("Content-Type", "application/zip");
//   res.setHeader("Content-Disposition", "attachment; filename=file.zip");

//   // Stream the ZIP file to the response
//   const fileStream = fs.createReadStream(zipFilePath);
//   fileStream.pipe(res);
// });
module.exports = router;

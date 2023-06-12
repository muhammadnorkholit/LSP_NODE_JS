const express = require("express");
const SiswaController = require("../controllers/SiswaController");
const upload = require("../uploadConfig/upload");
const router = express.Router();

router.get("/", SiswaController.index);
router.get("/count", SiswaController.count);
router.post("/", SiswaController.store);
router.get("/:id", SiswaController.show);
router.put("/:id", SiswaController.update);
router.delete("/:id", SiswaController.delete);
router.post("/import", upload.single("excelFile"), SiswaController.import);

module.exports = router;

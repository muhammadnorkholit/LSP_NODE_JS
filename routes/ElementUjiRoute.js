const express = require("express");
const ElementUjiController = require("../controllers/ElementUjiController");
const upload = require("../uploadConfig/upload");
const router = express.Router();

router.get("/", ElementUjiController.index);
router.post("/", ElementUjiController.store);
router.get("/:id", ElementUjiController.show);
router.put("/:id", ElementUjiController.update);
router.delete("/:id", ElementUjiController.delete);
router.post("/import", upload.single("excelFile"), ElementUjiController.import);
module.exports = router;

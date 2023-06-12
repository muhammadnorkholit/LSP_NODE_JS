const express = require("express");
const JurusanController = require("../controllers/JurusanController");
const upload = require("../uploadConfig/upload");
const router = express.Router();

router.get("/", JurusanController.index);
router.get("/count", JurusanController.count);
router.post("/", JurusanController.store);
router.get("/:id", JurusanController.show);
router.put("/:id", JurusanController.update);
router.delete("/:id", JurusanController.delete);
router.post("/import", upload.single("excelFile"), JurusanController.import);

module.exports = router;

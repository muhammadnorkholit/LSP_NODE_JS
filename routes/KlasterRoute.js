const express = require("express");
const KlasterController = require("../controllers/KlasterController");
const router = express.Router();

router.get("/", KlasterController.index);
router.get("/count", KlasterController.count);
router.post("/", KlasterController.store);
router.get("/:id", KlasterController.show);
router.put("/:id", KlasterController.update);
router.delete("/:id", KlasterController.delete);

module.exports = router;

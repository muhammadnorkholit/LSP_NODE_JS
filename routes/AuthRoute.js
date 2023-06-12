const express = require("express");
const SiswaController = require("../controllers/SiswaController");
const upload = require("../uploadConfig/upload");
const Auth = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", Auth.login);

module.exports = router;

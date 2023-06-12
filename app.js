const express = require("express");
const SiswaController = require("./controllers/SiswaController");
const app = express();
const cors = require("cors");
const SiswaRoute = require("./routes/SiswaRoute");
const KlasterRoute = require("./routes/KlasterRoute");
const AuthRoute = require("./routes/AuthRoute");
const JurusanRoute = require("./routes/JurusanRoute");
const ElementUjiRoute = require("./routes/ElementUjiRoute");
const PenilaianRoute = require("./routes/PenilaianRoute");
const session = require("express-session");
const bcrypt = require("bcrypt");

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://192.168.1.2:3000", "http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/siswa", isAuthenticated, SiswaRoute);
app.use("/auth", AuthRoute);
app.use("/jurusan", isAuthenticated, JurusanRoute);
app.use("/klaster", isAuthenticated, KlasterRoute);
app.use("/element-uji", isAuthenticated, ElementUjiRoute);
app.use("/penilaian", isAuthenticated, PenilaianRoute);

function isAuthenticated(req, res, next) {
  console.log(req.session.isLoggedIn);
  return next();
  if (req.session.isLoggedIn) {
    console.log("error");
  }
  res.status(401).json({ message: "Unauthorized user" });
}
app.listen(5000);

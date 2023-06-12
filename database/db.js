const Sequelize = require("sequelize");

// Replace 'database', 'username', and 'password' with your MySQL database credentials
const db = new Sequelize("db_lsp_baru", "root", "051299", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = db;

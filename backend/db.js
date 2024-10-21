const mysql = require("mysql2");
require("dotenv").config();
console.log(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME
);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

module.exports = db;

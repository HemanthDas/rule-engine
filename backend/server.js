const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.DB_HOST);

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

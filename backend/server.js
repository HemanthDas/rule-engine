const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const ruleRouter = require('./routers/ruleRouter');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/rules', ruleRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

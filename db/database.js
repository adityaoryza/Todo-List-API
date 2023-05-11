const mysql = require("mysql");
require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "localhost",
//   user: process.env.MYSQL_PORT || "root",
//   password: process.env.MYSQL_USER || "Aditya123@",
//   database: process.env.MYSQL_DBNAME || "TODO_List",
// });
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aditya123@",
  database: "TODO_List",
});

db.connect((error) => {
  if (error) throw error;
  console.log("DB Connected");
});

module.exports = db;

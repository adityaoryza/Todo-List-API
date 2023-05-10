const mysql = require("mysql");

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

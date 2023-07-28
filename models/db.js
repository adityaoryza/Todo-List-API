const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
  connectionLimit: 10, // Set the maximum number of connections in the pool
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
});

module.exports = db;

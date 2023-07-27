const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
});

db.connect((error) => {
  if (error) throw error;
  console.log('DB Connected');

  migration(() => console.log('Migration running...'));
});

const migration = () => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS activities (
      activity_id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (activity_id)
    )
    `
  );

  db.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      todo_id INT NOT NULL AUTO_INCREMENT,
      activity_group_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      priority VARCHAR(255) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (todo_id),
      FOREIGN KEY (activity_group_id) REFERENCES activities(activity_id) ON DELETE CASCADE
    )
    `
  );
};

module.exports = db;

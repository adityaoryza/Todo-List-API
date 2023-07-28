const db = require('./db');

// Migration function for creating tables
const migration = () => {
  // Create 'activities' table
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
    `,
    (error) => {
      if (error) throw error;
      console.log('Activities table created');
    }
  );

  // Create 'todos' table
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
    `,
    (error) => {
      if (error) throw error;
      console.log('Todos table created');
    }
  );
};

module.exports = migration;

// currently not using migration

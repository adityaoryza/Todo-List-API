// dbUtils.js
const db = require('./db'); // Replace with your database connection module

exports.queryAsync = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

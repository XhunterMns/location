const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'location_db'
});

db.connect((err) => {
  if (err) {
    console.log('DB error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
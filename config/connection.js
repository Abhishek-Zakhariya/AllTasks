const mysql = require('mysql');
const dbInfo = require('dotenv');

dbInfo.config({ path: './config/.env' });

const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.db
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Server Created Successfully");
});

module.exports = conn;


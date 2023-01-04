const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, sessionID VARCHAR(100),
      name VARCHAR(100), email VARCHAR(100), password VARCHAR(100), address_line_1 VARCHAR(100), address_line_2 VARCHAR(100), city VARCHAR(50),
      state VARCHAR(50), zip_code VARCHAR(20), phone_number VARCHAR(15), card_number VARCHAR(20), date VARCHAR(50), cvv VARCHAR(5), billing_zip VARCHAR(20), UNIQUE (sessionID))`
    )
  )
  .catch((err) => console.log(err));

module.exports = db;

const mysql = require("mysql2/promise");
const parseDbUrl = require("parse-database-url")

async function getConnection() {
  // create the connection
  const dbConfig = parseDbUrl(process.env.DATABASE_URL);
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = getConnection;
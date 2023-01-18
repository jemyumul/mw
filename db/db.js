const mysql = require("mysql2/promise");
async function getConnection() {
  // create the connection
  console.log(process.env.DB_HOST)
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  return connection;
}

module.exports = getConnection;
const mysql = require("mysql2/promise");
async function getConnection() {
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: "maxwax_test",
    password: "l0rdg@b3n",
    database: "maxwax_cms",
  });
  return connection;
}

module.exports = getConnection;
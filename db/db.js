const mysql = require("mysql2/promise");
async function getConnection() {
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_URL,
    port:  3306,
    user: "maxwax_test",
    password: "l0rdg@b3n",
    database: "maxwax_cms",
  });
  return connection;
}

module.exports = getConnection;
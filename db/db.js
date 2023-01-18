const mysql = require("mysql2/promise");
const parseDbUrl = require("parse-database-url");

async function getConnection() {
  // create the connection
  // const connection = await mysql.createConnection({
  //   host: "web.r2groupofcompanies.com",
  //   port:  3306,
  //   user: "maxwax_test",
  //   password: "l0rdg@b3n",
  //   database: "maxwax_cms",
  // });

  const dbConfig = parseDbUrl(process.env.DATABASE_URL);
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = getConnection;
const { Pool } = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// module.exports = pool;

const pool = new Pool({
  connectionString: process.env.PRODUCTION_DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

module.exports = pool;

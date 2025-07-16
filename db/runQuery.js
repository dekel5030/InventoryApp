const pool = require("./pool.js");

async function runQuery(query, params = []) {
  try {
    const result = await pool.query(query, params);
    return result;
  } catch (err) {
    console.error("Database error:", err.message);
    throw new Error("Database operation failed");
  }
}

module.exports = {
  runQuery,
};

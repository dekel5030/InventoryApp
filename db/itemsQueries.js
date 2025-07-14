const pool = require("./pool");

async function getAllItems() {
  const query = `SELECT * FROM items`;
  const { rows } = await pool.query(query);

  return rows;
}

async function getItemById(id) {
  const query = `SELECT * FROM items WHERE id = $1 LIMIT 1`;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

module.exports = {
  getAllItems,
  getItemById,
};

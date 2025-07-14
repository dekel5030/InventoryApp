const pool = require("./pool");

async function getAllItems() {
  const query = `SELECT * FROM items`;
  const { rows } = await runQuery(query);

  return rows;
}

async function getItemById(id) {
  const query = `SELECT * FROM items WHERE id = $1 LIMIT 1`;
  const { rows } = await runQuery(query, [id]);

  return rows[0];
}

async function createItem(item) {
  const query = `INSERT INTO items (name, details, amount, image_url, category_id)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *;`;
  const { name, details, amount, imageUrl, categoryId } = item;
  const params = [name, details, amount, imageUrl, categoryId];
  const { rows } = await runQuery(query, params);

  return rows[0];
}

async function updateItem(item) {
  const query = `
    UPDATE items SET 
      name = $1, 
      details = $2, 
      amount = $3, 
      image_url = $4, 
      category_id = $5 
    WHERE id = $6 
    RETURNING *;
  `;

  const { name, details, amount, imageUrl, categoryId, id } = item;
  const params = [name, details, amount, imageUrl, categoryId, id];
  const { rows } = await runQuery(query, params);

  return rows[0] || null;
}

async function deleteItem(id) {
  const query = "DELETE FROM items WHERE id = $1 RETURNING *";
  const { rows } = await runQuery(query, [id]);

  if (rows.length === 0) {
    throw new Error(`Item with id ${id} not found`);
  }

  return rows[0];
}

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
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  createItem,
};

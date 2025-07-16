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
  const query = `INSERT INTO items (name, details, amount, image_url, category_id, price)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *;`;

  const params = [
    item.name,
    item.details,
    item.amount,
    item.image_url,
    item.category_id,
    item.price,
  ];
  const { rows } = await runQuery(query, params);

  return rows[0];
}

async function patchItem(item) {
  const keys = Object.keys(item).filter(
    (key) => key !== "id" && item[key] != null
  );

  if (keys.length === 0) {
    throw new Error("No fields provided to update");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = keys.map((key) => item[key]);

  const query = `
    UPDATE items
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    RETURNING *;
  `;

  values.push(item.id);

  const { rows } = await runQuery(query, values);
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
  patchItem,
  deleteItem,
  createItem,
};

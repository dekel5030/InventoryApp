const { runQuery } = require("./runQuery.js");
const { TABLES, COLUMNS } = require("./constants");

const table = TABLES.ITEMS;
const columns = COLUMNS.ITEMS;

async function getAllItems() {
  const query = `SELECT * FROM ${table};`;
  const { rows } = await runQuery(query);

  return rows;
}

async function getItemById(id) {
  const query = `SELECT * FROM ${table} WHERE ${columns.ID} = $1 LIMIT 1;`;
  const { rows } = await runQuery(query, [id]);

  return rows[0];
}

async function createItem(item) {
  const query = `
                INSERT INTO ${table} (${columns.NAME}, 
                            ${columns.DETAILS}, ${columns.AMOUNT}, 
                            ${columns.IMAGE_URL}, ${columns.CATEGORY_ID}, ${columns.PRICE})
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
                `;

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
                UPDATE ${table}
                SET ${setClause}
                WHERE ${columns.ID} = $${keys.length + 1}
                RETURNING *;
                `;

  values.push(item.id);

  const { rows } = await runQuery(query, values);
  return rows[0] || null;
}

async function deleteItem(id) {
  const query = `DELETE FROM ${table} WHERE ${columns.ID} = $1 RETURNING *;`;
  const { rows } = await runQuery(query, [id]);

  if (rows.length === 0) {
    throw new Error(`Item with id ${id} not found`);
  }

  return rows[0];
}

module.exports = {
  getAllItems,
  getItemById,
  patchItem,
  deleteItem,
  createItem,
};

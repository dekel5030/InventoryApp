const { runQuery } = require("./runQuery.js");
const { TABLES, COLUMNS } = require("./constants");

const table = TABLES.CATEGORIES;
const columns = COLUMNS.CATEGORIES;

async function getAllCategories() {
  const query = `SELECT * FROM ${table};`;
  const { rows } = await runQuery(query);

  return rows;
}

async function createCategory(category) {
  const query = `INSERT INTO ${table} (${columns.NAME}, ${columns.IMAGE_URL}) VALUES ($1, $2) RETURNING *;`;
  const { rows } = await runQuery(query, [category.name, category.image_url]);
  return rows[0];
}

async function patchCategory(category) {
  const keys = Object.keys(category).filter(
    (key) => key !== "id" && category[key] != null
  );

  if (keys.length === 0) {
    throw new Error("No fields provided to update");
  }

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = keys.map((key) => category[key]);

  const query = `
                UPDATE ${table}
                SET ${setClause}
                WHERE id = $${keys.length + 1}
                RETURNING *;
                `;

  values.push(category.id);

  const { rows } = await runQuery(query, values);
  return rows[0] || null;
}

async function deleteCategory(id) {
  const query = `DELETE from ${table} where ${columns.ID} = $1 RETURNING *;`;
  const { rows } = await runQuery(query, [id]);

  if (rows.length === 0) {
    throw new Error(`Category with id ${id} not found`);
  }

  return rows[0];
}

async function getCategoryById(id) {
  const query = `SELECT * FROM ${table} WHERE ${columns.ID} = $1 LIMIT 1;`;
  const { rows } = await runQuery(query, [id]);

  return rows[0];
}

async function getAllItemsInCategory(categoryId) {
  const query = `
                SELECT i.*
                FROM ${TABLES.ITEMS} i
                JOIN ${TABLES.CATEGORIES} c
                  ON i.${COLUMNS.ITEMS.CATEGORY_ID} = c.${columns.ID}
                WHERE c.${columns.ID} = $1;
                `;

  const { rows } = await runQuery(query, [categoryId]);
  return rows;
}

module.exports = {
  getAllCategories,
  createCategory,
  patchCategory,
  deleteCategory,
  getCategoryById,
  getAllItemsInCategory,
};

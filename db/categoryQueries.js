const { runQuery } = require("./runQuery.js");

async function getAllCategories() {
  const query = `SELECT * FROM categories;`;
  const { rows } = await runQuery(query);

  return rows;
}

async function createCategory(category) {
  const query = `INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *;`;
  const { rows } = await runQuery(query);

  return rows[0];
}

async function patchCategory(category) {
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
}

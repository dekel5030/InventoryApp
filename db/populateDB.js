const pool = require("./pool");

const SQLCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);`;

const SQLItemsTable = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  details VARCHAR(255),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  image_url TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);`;

async function main() {
  try {
    console.log("Creating tables...");

    await pool.query(SQLCategoriesTable);
    console.log("Categories table created");

    await pool.query(SQLItemsTable);
    console.log("Items table created");

    await pool.query("DELETE FROM items");
    await pool.query("DELETE FROM categories");

    console.log("Inserting categories...");

    const categoryResult = await pool.query(`
      INSERT INTO categories (name) VALUES 
      ('Laptops'),
      ('Monitors'),
      ('Keyboards')
      RETURNING *;
    `);

    console.log("Categories inserted:", categoryResult.rows);

    const categories = categoryResult.rows;

    console.log("Inserting items...");

    await pool.query(`
      INSERT INTO items (name, details, amount, image_url, category_id) VALUES
      ('MacBook Pro', '16-inch, Apple M2 Pro', 5, '/uploads/macbook.jpg', ${categories[0].id}),
      ('LG UltraFine', '4K USB-C Monitor', 3, '/uploads/lg-monitor.jpg', ${categories[1].id}),
      ('Mechanical Keyboard', 'RGB, Blue switches', 10, '/uploads/keyboard.jpg', ${categories[2].id});
    `);
    console.log("Items inserted");

    console.log("Seeding done!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await pool.end();
  }
}

main();

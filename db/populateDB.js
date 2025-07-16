const pool = require("./pool");

const SQLCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  image_url TEXT
);`;

const SQLItemsTable = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  details VARCHAR(255),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  image_url TEXT,
  price NUMERIC(10, 2) CHECK (price >= 0),
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);`;

async function main() {
  try {
    console.log("Dropping exists tables...");
    await pool.query("DROP TABLE IF EXISTS items");
    await pool.query("DROP TABLE IF EXISTS categories");

    console.log("Creating tables...");

    await pool.query(SQLCategoriesTable);
    console.log("Categories table created");

    await pool.query(SQLItemsTable);
    console.log("Items table created");

    await pool.query("DELETE FROM items");
    await pool.query("DELETE FROM categories");

    console.log("Inserting categories...");

    const categoryResult = await pool.query(`
      INSERT INTO categories (name, image_url) VALUES 
      ('Watches', '/images/apple_watch_ultra_2.jpeg'),
      ('Phones', '/images/iphone_16.jpeg'),
      ('Laptops', '/images/macbook_pro.jpeg')
      RETURNING *;
    `);

    console.log("Categories inserted:", categoryResult.rows);

    const categories = categoryResult.rows;

    console.log("Inserting items...");

    await pool.query(`
      INSERT INTO items (name, details, amount, image_url, price, category_id) VALUES
      -- Watches
      ('Apple Watch SE', 'Affordable and capable', 15, '/images/apple_watch_se.jpeg', 249.99, ${categories[0].id}),
      ('Apple Watch Series 10', 'Latest gen health tracker', 10, '/images/apple_watch_series_10.jpeg', 399.99, ${categories[0].id}),
      ('Apple Watch Ultra 2', 'Rugged outdoor design', 5, '/images/apple_watch_ultra_2.jpeg', 799.99, ${categories[0].id}),

      -- Phones
      ('iPhone 16', 'Flagship performance', 20, '/images/iphone_16.jpeg', 1099.99, ${categories[1].id}),
      ('iPhone 16 Pro', 'Premium build and features', 8, '/images/iphone_16_pro.jpeg', 1399.99, ${categories[1].id}),
      ('iPhone 16e', 'Budget friendly option', 12, '/images/iphone_16e.jpeg', 799.99, ${categories[1].id}),

      -- Laptops
      ('MacBook Air', 'Lightweight, M3 chip', 10, '/images/macbook_air.jpeg', 999.99, ${categories[2].id}),
      ('MacBook Pro', 'Performance beast', 4, '/images/macbook_pro.jpeg', 2499.99, ${categories[2].id}),
      ('iMac', 'Desktop all-in-one', 6, '/images/imac.jpeg', 1799.99, ${categories[2].id});
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

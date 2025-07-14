const itemsDB = require("../db/itemsQueries");

async function renderCreateView(req, res) {}
async function createItem(req, res) {}
async function renderEditView(req, res) {}
async function updateItem(req, res) {
  const { name, details, amount, imageUrl, category } = req.body;
  validateItem();
}

async function deleteItem(req, res) {
  const id = parseInt(req.params.id, 10);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid item id" });
  }

  try {
    const deletedItem = await itemsDB.deleteItem(id);
    res.status(200).json(deletedItem);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ error: err.message });
    }

    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function getItem(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const item = await itemsDB.getItemById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await itemsDB.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

function validateItem(item) {
  const schema = {
    id: "number",
    name: "string",
    details: "string",
    amount: "number",
    imageUrl: "string",
    category: "number",
  };

  for (const [key, type] of Object.entries(schema)) {
    if (typeof item[key] !== type) {
      throw new Error(`Invalid or missing field: ${key}`);
    }
  }
}

module.exports = {
  renderCreateView,
  createItem,
  renderEditView,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
};

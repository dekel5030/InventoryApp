const itemsDB = require("../db/itemsQueries");

async function renderCreateView(req, res) {
  res.render("items/create");
}

async function createItem(req, res) {
  const { name, details, amount, imageUrl, categoryId, price } = req.body;
  const item = { name, details, amount, imageUrl, categoryId, price };

  try {
    const newItem = await itemsDB.createItem(item);

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function renderEditView(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await itemsDB.getItemById(id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("items/edit", { item });
  } catch (err) {
    console.error("Render edit error:", err.message);
    res.status(500).send("Server error");
  }
}

async function updateItem(req, res) {
  const id = Number(req.params.id);
  const { name, details, amount, imageUrl, categoryId } = req.body;
  const item = { name, details, amount, imageUrl, categoryId };
  try {
    const updatedItem = await itemsDB.updateItem(item);

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteItem(req, res) {
  const id = Number(req.params.id);

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

  try {
    const item = await itemsDB.getItemById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.render("layout", {
      item: item,
      viewToRender: "./partials/itemSection.ejs",
    });
  } catch (err) {
    console.error("Get item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await itemsDB.getAllItems();
    const normalizedItems = items.map((item) => ({
      ...item,
      price: item.price !== null ? Number(item.price) : null,
    }));

    res.render("layout", {
      pageTitle: "All Items",
      items: normalizedItems,
      viewToRender: "./partials/itemsGrid.ejs",
    });
  } catch (err) {
    console.error("Get all items error:", err.message);
    res.status(500).json({ error: "Server error" });
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

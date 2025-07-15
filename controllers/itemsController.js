const itemsDB = require("../db/itemsQueries");
const Item = require("../models/Item");

async function renderCreateView(req, res) {
  res.render("layout", {
    viewToRender: "./partials/editItemSection.ejs",
    item: {
      name: "Untiteld",
      details: "None",
      amount: 100,
      imageUrl: null,
      categoryId: 1,
      price: 100,
    },
    formAction: "/items",
  });
}

async function createItem(req, res) {
  try {
    const item = Item.fromForm(req.body, req.file);
    const newItem = await itemsDB.createItem(item.toDbObject());
    res.redirect("/items");
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function renderEditView(req, res) {
  const id = Number(req.params.id);
  try {
    let item = await itemsDB.getItemById(id);

    if (!item) {
      return res.status(404).send("Item not found");
    }
    item = Item.fromDb(item);
    res.render("layout", {
      viewToRender: "./partials/editItemSection",
      item,
      formAction: `/items/${item.id}?_method=PATCH`,
    });
  } catch (err) {
    console.error("Render edit error:", err.message);
    res.status(500).send("Server error");
  }
}

async function patchItem(req, res) {
  const id = Number(req.params.id);

  const { name, details, amount, categoryId, price } = req.body || {};

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imageUrl;

  const item = {
    id,
    name,
    details,
    amount: amount ? Number(amount) : undefined,
    imageUrl,
    categoryId: categoryId ? Number(categoryId) : undefined,
    price: price ? Number(price) : undefined,
  };

  try {
    const updatedItem = await itemsDB.patchItem(item);

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.redirect("/items/" + id);
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
    const { image_url, category_id, ...rest } = item;
    res.render("layout", {
      item: {
        ...rest,
        imageUrl: image_url,
        categoryId: category_id,
      },
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
      id: item.id,
      name: item.name,
      details: item.details,
      amount: item.amount,
      price: item.price !== null ? Number(item.price) : null,
      imageUrl: item.image_url,
      categoryId: item.category_id,
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
  patchItem,
  deleteItem,
  getItem,
  getAllItems,
};

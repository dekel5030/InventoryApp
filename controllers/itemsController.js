const itemsDB = require("../db/itemsQueries");
const categoriesDB = require("../db/categoryQueries.js");
const Item = require("../models/Item");
const Category = require("../models/category");
const asyncHandler = require("../middlewares/asyncHandler");

async function renderCreateView(req, res) {
  const dbCategories = await categoriesDB.getAllCategories();
  const categories = dbCategories.map(Category.fromDb);

  res.render("layout", {
    viewToRender: "./partials/editItemSection.ejs",
    item: new Item(),
    formAction: "/items",
    pageTitle: "Add new item",
    categories,
  });
}

async function createItem(req, res, next) {
  const item = Item.fromForm(req.body, req.file);
  const newItem = await itemsDB.createItem(item.toDbObject());
  res.redirect("/items");
}

async function renderEditView(req, res) {
  const id = Number(req.params.id);
  let item = await itemsDB.getItemById(id);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  item = Item.fromDb(item);
  const dbCategories = await categoriesDB.getAllCategories();
  const categories = dbCategories.map(Category.fromDb);

  res.render("layout", {
    viewToRender: "./partials/editItemSection",
    item,
    formAction: `/items/${item.id}?_method=PATCH`,
    pageTitle: `${item.name} editor`,
    categories,
  });
}

async function patchItem(req, res) {
  const item = Item.fromForm(req.body, req.file);
  item.id = Number(req.params.id);
  const updatedItem = await itemsDB.patchItem(item.toDbObject());

  if (!updatedItem) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.redirect("/items/" + item.id);
}

async function deleteItem(req, res) {
  const id = Number(req.params.id);
  const deletedItem = await itemsDB.deleteItem(id);
  res.status(200).json({ redirectTo: "/items" });
}

async function getItem(req, res) {
  const id = Number(req.params.id);

  const dbItem = await itemsDB.getItemById(id);

  if (!dbItem) {
    return res.status(404).render("error", {
      pageTitle: "Item Not Found",
      message: "The requested item does not exist.",
      error: null,
    });
  }
  const item = Item.fromDb(dbItem);
  res.render("layout", {
    item: item,
    viewToRender: "./partials/itemSection.ejs",
    pageTitle: `${item.name}`,
  });
}

async function getAllItems(req, res) {
  const dbItems = await itemsDB.getAllItems();
  const items = dbItems.map((dbItem) => Item.fromDb(dbItem));

  res.render("layout", {
    pageTitle: "All Items",
    items,
    viewToRender: "./partials/itemsGrid.ejs",
  });
}

module.exports = {
  renderCreateView: asyncHandler(renderCreateView),
  createItem: asyncHandler(createItem),
  renderEditView: asyncHandler(renderEditView),
  patchItem: asyncHandler(patchItem),
  deleteItem: asyncHandler(deleteItem),
  getItem: asyncHandler(getItem),
  getAllItems: asyncHandler(getAllItems),
};

const categoriesDB = require("../db/categoryQueries.js");
const Category = require("../models/category.js");
const Item = require("../models/item.js");
const asyncHandler = require("../middlewares/asyncHandler.js");

async function getAllCategories(req, res) {
  const dbCategories = await categoriesDB.getAllCategories();
  const categories = dbCategories.map((dbCategory) =>
    Category.fromDb(dbCategory)
  );

  res.render("layout", {
    viewToRender: "./partials/categoriesGrid.ejs",
    items: categories,
    pageTitle: "All categories",
  });
}

async function getCategory(req, res) {
  const id = Number(req.params.id);
  const dbCategory = await categoriesDB.getCategoryById(id);
  const category = Category.fromDb(dbCategory);
  const dbCategoryItems = await categoriesDB.getAllItemsInCategory(id);
  const categoryItems = dbCategoryItems.map((dbCategory) =>
    Item.fromDb(dbCategory)
  );
  res.render("layout", {
    viewToRender: [
      "./partials/categorySection.ejs",
      "./partials/itemsGrid.ejs",
    ],
    items: categoryItems,
    category: category,
    pageTitle: `${category.name} items`,
  });
}

module.exports = {
  getAllCategories: asyncHandler(getAllCategories),
  getCategory: asyncHandler(getCategory),
};

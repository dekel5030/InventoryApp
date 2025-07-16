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

async function getCategory(req, res, next) {
  const id = Number(req.params.id);
  const dbCategory = await categoriesDB.getCategoryById(id);

  if (!dbCategory) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

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

async function renderEditView(req, res) {
  const id = Number(req.params.id);
  const dbCategory = await categoriesDB.getCategoryById(id);

  if (!dbCategory) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  const category = Category.fromDb(dbCategory);

  res.render("layout", {
    viewToRender: "./partials/editCategorySection.ejs",
    pageTitle: `${category.name} editor`,
    category,
    formAction: `/categories/${category.id}?_method=PATCH`,
  });
}

async function patchCategory(req, res) {
  const category = Category.fromForm(req.body, req.file);
  category.id = Number(req.params.id);
  const updatedCategory = await categoriesDB.patchCategory(
    category.toDbObject()
  );

  if (!updatedCategory) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.redirect("/categories/" + category.id);
}

async function renderCreateView(req, res) {
  res.render("layout", {
    viewToRender: "./partials/editCategorySection.ejs",
    pageTitle: `New category`,
    category: new Category(),
    formAction: `/categories/`,
  });
}

async function createCategory(req, res) {
  const category = Category.fromForm(req.body, req.file);
  const dbCategory = await categoriesDB.createCategory(category.toDbObject());
  res.redirect("/categories");
}

async function deleteCategory(req, res) {
  id = Number(req.params.id);
  const deletedCategory = await categoriesDB.deleteCategory(id);
  res.status(200).json({ redirectTo: "/categories" });
}

module.exports = {
  getAllCategories: asyncHandler(getAllCategories),
  getCategory: asyncHandler(getCategory),
  renderEditView: asyncHandler(renderEditView),
  patchCategory: asyncHandler(patchCategory),
  renderCreateView: asyncHandler(renderCreateView),
  createCategory: asyncHandler(createCategory),
  deleteCategory: asyncHandler(deleteCategory),
};

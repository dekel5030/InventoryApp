const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController.js");
const CategoriesRouter = Router();

// GET
CategoriesRouter.get("/:id", categoriesController.getCategory);
CategoriesRouter.get("/", categoriesController.getAllCategories);

module.exports = CategoriesRouter;

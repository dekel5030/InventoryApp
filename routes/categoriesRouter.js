const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController.js");
const upload = require("../middlewares/upload.js");
const multerErrorHandler = require("../middlewares/filesErrorHandler.js");
const {
  validateCategoryId,
  validateCategoryBody,
} = require("../validators/categories/categoryValidator.js");

const CategoriesRouter = Router();

// CREATE
CategoriesRouter.get("/new", categoriesController.renderCreateView);
CategoriesRouter.post(
  "/",
  upload.single("image"),
  multerErrorHandler,
  validateCategoryBody,
  categoriesController.createCategory
);

// READ
CategoriesRouter.get(
  "/:id",
  validateCategoryId,
  categoriesController.getCategory
);
CategoriesRouter.get("/", categoriesController.getAllCategories);

// DELETE
CategoriesRouter.delete(
  "/:id",
  validateCategoryId,
  categoriesController.deleteCategory
);

// UPDATE
CategoriesRouter.get(
  "/:id/edit",
  validateCategoryId,
  categoriesController.renderEditView
);

CategoriesRouter.patch(
  "/:id",
  upload.single("image"),
  multerErrorHandler,
  validateCategoryId,
  categoriesController.patchCategory
);

module.exports = CategoriesRouter;

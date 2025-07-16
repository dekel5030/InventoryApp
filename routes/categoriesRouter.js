const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController.js");
const upload = require("../middlewares/upload.js");
const multerErrorHandler = require("../middlewares/filesErrorHandler.js");
const CategoriesRouter = Router();

// CREATE
CategoriesRouter.get("/new", categoriesController.renderCreateView);
CategoriesRouter.post(
  "/",
  upload.single("image"),
  multerErrorHandler,
  categoriesController.createCategory
);

// READ
CategoriesRouter.get("/:id", categoriesController.getCategory);
CategoriesRouter.get("/", categoriesController.getAllCategories);

// DELETE
CategoriesRouter.delete("/:id", categoriesController.deleteCategory);

// UPDATE
CategoriesRouter.get("/:id/edit", categoriesController.renderEditView);
CategoriesRouter.patch(
  "/:id",
  upload.single("image"),
  multerErrorHandler,
  categoriesController.patchCategory
);

module.exports = CategoriesRouter;

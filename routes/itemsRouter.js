const { Router } = require("express");
const verifyAdminPassword = require("../middlewares/adminPassword.js");
const itemsController = require("../controllers/itemsController");
const itemValidators = require("../validators/items");
const upload = require("../middlewares/upload.js");
const multerErrorHandler = require("../middlewares/filesErrorHandler.js");

const itemsRouter = Router();

// ----- Create -----
itemsRouter.get("/new", itemsController.renderCreateView);
itemsRouter.post(
  "/",
  upload.single("image"),
  multerErrorHandler,
  itemValidators.create,
  itemsController.createItem
);

// ----- Read -----
itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/:id", itemValidators.get, itemsController.getItem);

// ----- Update -----
itemsRouter.get("/:id/edit", itemsController.renderEditView);
itemsRouter.patch(
  "/:id",
  upload.single("image"),
  multerErrorHandler,
  verifyAdminPassword,
  itemValidators.patch,
  itemsController.patchItem
);

// ----- Delete -----
itemsRouter.delete(
  "/:id",
  verifyAdminPassword,
  itemValidators.delete,
  itemsController.deleteItem
);

module.exports = itemsRouter;

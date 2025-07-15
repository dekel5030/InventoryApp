const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemValidators = require("../validators/items");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const itemsRouter = Router();

// ----- Create -----
itemsRouter.get("/new", itemsController.renderCreateView);
itemsRouter.post("/", itemValidators.create, itemsController.createItem);

// ----- Read -----
itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/:id", itemValidators.get, itemsController.getItem);

// ----- Update -----
itemsRouter.get("/:id/edit", itemsController.renderEditView);
itemsRouter.patch(
  "/:id",
  upload.single("image"),
  itemValidators.patch,
  itemsController.patchItem
);

// ----- Delete -----
itemsRouter.delete("/:id", itemValidators.delete, itemsController.deleteItem);

module.exports = itemsRouter;

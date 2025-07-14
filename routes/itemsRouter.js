const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemValidators = require("../validators/items");

const itemsRouter = Router();

// ----- Create -----
itemsRouter.get("/new", itemsController.renderCreateView);
itemsRouter.post("/", itemValidators.create, itemsController.createItem);

// ----- Read -----
itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/:id", itemValidators.get, itemsController.getItem);

// ----- Update -----
itemsRouter.get("/:id/edit", itemsController.renderEditView);
itemsRouter.put("/:id", itemValidators.update, itemsController.updateItem);

// ----- Delete -----
itemsRouter.delete("/:id", itemValidators.delete, itemsController.deleteItem);

module.exports = itemsRouter;

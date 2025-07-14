const { body, param, validationResult } = require("express-validator");

const validateUpdateItem = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Item ID must be a positive integer"),

  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and cannot be empty"),

  body("details").isString().withMessage("Details must be a string"),

  body("amount")
    .isInt({ min: 0 })
    .withMessage("Amount must be a non-negative integer"),

  body("imageUrl").isString().withMessage("Image URL must be a string"),

  body("categoryId")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUpdateItem;

const { body, param, validationResult } = require("express-validator");

const validatePatchItem = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Item ID must be a positive integer"),

  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name is required and cannot be empty"),

  body("details").optional().isString().withMessage("Details must be a string"),

  body("amount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Amount must be a non-negative integer"),

  body("imageUrl")
    .optional()
    .isString()
    .withMessage("Image URL must be a string"),

  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validatePatchItem;

const { body, validationResult } = require("express-validator");

const validateCreateItem = [
  body("name")
    .trim()
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name is required."),

  body("details")
    .optional()
    .trim()
    .isString()
    .withMessage("Details must be a string."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Amount must be a non-negative integer."),

  // Uncomment if needed
  // body("categoryId")
  //   .notEmpty()
  //   .withMessage("Category ID is required.")
  //   .toInt()
  //   .isInt({ min: 1 })
  //   .withMessage("Category ID must be a positive integer."),

  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCreateItem;

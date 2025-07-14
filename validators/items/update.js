const { body, param, validationResult } = require("express-validator");

const validateUpdateItem = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),

  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("details").optional().isString(),

  body("amount").optional().isInt({ min: 0 }),

  body("imageUrl").optional().isString(),

  body("categoryId").optional().isInt({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUpdateItem;

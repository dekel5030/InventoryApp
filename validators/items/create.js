const { body, validationResult } = require("express-validator");

const validateCreateItem = [
  body("name").trim().isString().notEmpty(),
  body("details").optional().trim().isString(),

  // ✅ Convert string to int
  body("amount").toInt().isInt({ min: 0 }),

  // ✅ Convert string to int
  body("categoryId").toInt().isInt({ min: 1 }),

  // ✅ Convert string to float (for decimal prices)
  body("price").toFloat().isFloat({ min: 0 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCreateItem;

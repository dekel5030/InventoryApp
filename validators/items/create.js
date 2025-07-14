const { body, validationResult } = require("express-validator");

const validateCreateItem = [
  body("name").isString().notEmpty(),
  body("details").optional().isString(),
  body("amount").isInt({ min: 0 }),
  body("imageUrl").isString().notEmpty(),
  body("categoryId").isInt({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCreateItem;

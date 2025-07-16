const { body, param } = require("express-validator");

const validateCategoryId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),
];

const validateCategoryBody = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 50 })
    .withMessage("Category name must be less than 50 characters"),
];

module.exports = {
  validateCategoryId,
  validateCategoryBody,
};

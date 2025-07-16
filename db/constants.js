const TABLES = {
  ITEMS: "items",
  CATEGORIES: "categories",
};

const COLUMNS = {
  ITEMS: {
    ID: "id",
    NAME: "name",
    DETAILS: "details",
    AMOUNT: "amount",
    IMAGE_URL: "image_url",
    CATEGORY_ID: "category_id",
    PRICE: "price",
  },
  CATEGORIES: {
    ID: "id",
    NAME: "name",
    IMAGE_URL: "image_url",
  },
};

module.exports = {
  TABLES,
  COLUMNS,
};

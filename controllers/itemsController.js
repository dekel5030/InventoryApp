const usersDB = require("../db/itemsQueries");

async function renderCreateView(req, res) {}
async function createItem(req, res) {}
async function renderEditView(req, res) {}
async function updateItem(req, res) {}
async function deleteItem(req, res) {}
async function getItem(req, res) {
  const item = await usersDB.getItemById(req.params.id);
  res.json(item);
}

async function getAllItems(req, res) {
  const items = await usersDB.getAllItems();
  res.json(items);
}

module.exports = {
  renderCreateView,
  createItem,
  renderEditView,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
};

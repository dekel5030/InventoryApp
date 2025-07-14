async function renderHome(req, res) {
  res.render("layout", {
    categories: null,
    items: null,
  });
}

module.exports = {
  renderHome,
};

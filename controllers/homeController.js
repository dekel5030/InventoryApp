async function renderHome(req, res) {
  res.render("layout", {
    viewToRender: "./partials/mainSection.ejs",
  });
}

module.exports = {
  renderHome,
};

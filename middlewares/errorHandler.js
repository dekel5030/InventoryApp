function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err.message);

  if (req.accepts("html")) {
    res.status(500).render("error", {
      pageTitle: "Server Error",
      message: "Something went wrong.",
      error: err,
    });
  } else {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  errorHandler,
};

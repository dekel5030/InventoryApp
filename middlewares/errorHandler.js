function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;

  console.error("❌ Error:", err.message);

  if (req.accepts("html")) {
    res.status(statusCode).render("error", {
      pageTitle: statusCode === 404 ? "Not Found" : "Server Error",
      message:
        statusCode === 404
          ? "The page you are looking for does not exist."
          : "Something went wrong.",
    });
  } else {
    res.status(statusCode).json({
      error: err.message || "Server error",
    });
  }
}

module.exports = {
  errorHandler,
};

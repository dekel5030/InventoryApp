function multerErrorHandler(err, req, res, next) {
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
}

module.exports = multerErrorHandler;

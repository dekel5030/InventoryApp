function verifyAdminPassword(req, res, next) {
  const password = req.body.adminPassword;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Invalid admin password" });
  }

  next();
}

module.exports = verifyAdminPassword;

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extends: true }));

app.listen(PORT, () =>
  console.log(`Server has successfuly start on port: ${PORT}`)
);

const express = require("express");
const itemsRouter = require("./routes/itemsRouter");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extends: true }));

app.use("/items", itemsRouter);

app.listen(PORT, () =>
  console.log(`Server has successfuly start on port: ${PORT}`)
);

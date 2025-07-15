const express = require("express");
const itemsRouter = require("./routes/itemsRouter");
const homeController = require("./controllers/homeController");
const methodOverride = require("method-override");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extends: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));

app.use("/items", itemsRouter);
app.get("/", homeController.renderHome);

app.listen(PORT, () =>
  console.log(`Server has successfuly start on port: ${PORT}`)
);

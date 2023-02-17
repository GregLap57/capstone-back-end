const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const homeRouter = require("./routes/home");
const menuRouter = require("./routes/menu");
const galleryRouter = require("./routes/gallery");
const orderRouter = require("./routes/order");

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/home", homeRouter);
app.use("/menu", menuRouter);
app.use("/gallery", galleryRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Capstone api");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const router = require("express").Router();
const fs = require("fs");

const menuData = () => JSON.parse(fs.readFileSync("./data/menu.json"));

router.get("/", (req, res) => {
  res.json(menuData());
});

module.exports = router;

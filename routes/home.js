const router = require("express").Router();
const fs = require("fs");

const homeData = () => JSON.parse(fs.readFileSync("./data/home.json"));

router.get("/", (req, res) => {
  res.json(homeData());
});

module.exports = router;

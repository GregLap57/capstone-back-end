const router = require("express").Router();
const fs = require("fs");

const galleryData = () => JSON.parse(fs.readFileSync("./data/gallery.json"));

router.get("/", (req, res) => {
  res.json(galleryData());
});

module.exports = router;

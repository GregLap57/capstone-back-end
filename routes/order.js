const router = require("express").Router();
const fs = require("fs");

const orderData = () => JSON.parse(fs.readFileSync("./data/order.json"));

router
  .get("/", (req, res) => {
    res.json(orderData());
  })
  .get("/:id", (req, res) => {
    const orderList = orderData();
    const requestedDish = orderList.find((dish) => {
      return dish.id === req.params.id;
    });
    res.json(requestedDish);
  })
  .post("/", (req, res) => {
    const newOrder = req.body;
    const orderList = orderData();
    if (!newOrder.name) {
      res.status(400).send("Error Adding Dish To Your Order");
    }
    const orderItem = orderList.find((item) => item.id === newOrder.id);
    if (orderItem) {
      orderItem.quantity++;
    } else {
      newOrder.quantity = 1;
      orderList.push(newOrder);
    }
    fs.writeFileSync("./data/order.json", JSON.stringify(orderList));
    res.json(newOrder);
  })
  .delete("/:id", (req, res) => {
    const orderList = orderData();
    const orderIndex = orderList.findIndex(
      (order) => order.id === req.params.id
    );
    if (orderIndex === false) {
      res.status(404).send("Error Deleting Item In Your Cart");
    } else {
      orderList.splice(orderIndex, 1);
      fs.writeFileSync("./data/order.json", JSON.stringify(orderList));
      res.status(204).send("Your order was successfully removed");
    }
  })
  .delete("/", (req, res) => {
    fs.writeFileSync("./data/order.json", JSON.stringify([]));
    res.status(204).send("All items were successfully removed");
  });
module.exports = router;

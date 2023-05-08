const express = require("express");
const router = express.Router();

// Model Cart
const Carts = require("../models/Carts");
const Materials = require("../models/Materials");

// @route GET /carts/test
router.get("/test", (req, res) => res.send("Carts route testing!"));

// @route GET /carts
router.get("/", (req, res) => {
  Carts.find()
    .then((carts) => res.json(carts))
    .catch((err) => res.status(404).json({ cartnotfound: "No Carts found" }));
});

// @route GET /carts/:id where id is the userId
router.get("/:id", (req, res) => {
  Carts.findOne({ userId: req.params.id })
    .then((cart) => res.json(cart))
    .catch((err) => res.status(404).json({ error: "No Cart found" }));
});

// @route POST /carts
router.post("/", (req, res) => {
  // if user already had a cart, update it
  Carts.findOne({ userId: req.body.userId })
    .then((cart) => {
      if (cart) {
        // if item not already in cart add item(s) after existing items else update quantity +1
        let index = cart.items.findIndex(
          (item) => item.materialId === req.body.items.materialId
        );
        // if index === -1 -> item not in cart
        if (index === -1) {
          cart.items.push(req.body.items);
        } else {
          cart.items[index].quantity =
            parseInt(cart.items[index].quantity) + req.body.items.quantity;
        }
        //Update cart with new items
        Carts.findOneAndUpdate(
          { _id: cart._id },
          { $set: { items: cart.items } },
          { new: true }
        )
          .then((cart) => res.json(cart))
          .catch((err) => res.status(404).json({ error: "here" }));
      } else {
        // if user doesn't have a cart, create one
        let items = [];
        items.push(req.body.items);
        const newCart = new Carts({
          userId: req.body.userId,
          items: items,
        });
        newCart
          .save()
          .then((cart) => res.json(cart))
          .catch((err) => res.status(404).json({ error: "there" }));
      }
    })
    .catch((err) => res.status(404).json({ error: "end" }));
});

// @route PUT change quantity of 1 item from cart /carts/:id where id is the userId
router.put("/:id", (req, res) => {
  Carts.findOne({ userId: req.params.id })
    .then((cart) => {
      // change quantity of item in cart
      let index = cart.items.findIndex(
        (item) => item.materialId === req.body.materialId
      );
      if (req.body.quantity === "+") {
        cart.items[index].quantity = parseInt(cart.items[index].quantity) + 1;
      } else if (req.body.quantity === "-") {
        cart.items[index].quantity = parseInt(cart.items[index].quantity) - 1;
      } else {
        cart.items[index].quantity = req.body.quantity;
      }
      //Update cart with new items
      Carts.findOneAndUpdate(
        { _id: cart._id },
        { $set: { items: cart.items } },
        { new: true }
      )

        .then((cart) => res.json(cart))
        .catch((err) => res.status(404).json({ error: "here" }));
    })
    .catch((err) => res.status(404).json({ error: "end" }));
});

// @route POST one item from cart /carts/:id where id is the userId
router.post("/delete/:id", (req, res) => {
  Carts.findOne({ userId: req.params.id })
    .then((cart) => {
      // delete item from cart
      let index = cart.items.findIndex(
        (item) => item.materialId === req.body.materialId
      );
      cart.items.splice(index, 1);
      //Update cart with new items
      Carts.findOneAndUpdate(
        { _id: cart._id },
        { $set: { items: cart.items } },
        { new: true }
      )

        .then((cart) => res.json(cart))
        .catch((err) => res.status(404).json({ error: "here" }));
    })
    .catch((err) => res.status(404).json({ error: "end" }));
});

// @route DELETE all the cart /carts/:id where id is the userId

router.delete("/:id/all", (req, res) => {
  Carts.findOneAndDelete({ userId: req.params.id })
    .then((cart) => res.json(cart))
    .catch((err) => res.status(404).json({ error: "No Cart found" }));
});

// @route POST validate the cart and substract the quantity of the items from the stock /carts/:id where id is the userId
router.post("/validate/:id", (req, res) => {
  let stopExecution = false;
  Carts.findOne({ userId: req.params.id })
    .then((cart) => {
      // substact quantity of item in cart from stock
      cart.items.forEach((item) => {
        Materials.findOne({ _id: item.materialId })
          .then((material) => {
            if (material.quantity - item.quantity < 0) {
              stopExecution = true;
            }
          })
          .catch((err) => res.status(404).json({ error: "end" }));
      });
      //timeout
      setTimeout(() => {
        if (stopExecution == false) {
          cart.items.forEach((item) => {
            Materials.findOne({ _id: item.materialId })
              .then((material) => {
                material.quantity = material.quantity - item.quantity;
                Materials.findOneAndUpdate(
                  { _id: material._id },
                  { $set: { quantity: material.quantity } },
                  { new: true }
                ).catch((err) => res.status(404).json({ error: "here" }));
              })
              .catch((err) => res.status(404).json({ error: "end" }));
          });
          Carts.findOneAndDelete({ userId: req.params.id })
            .then((cart) => res.json(cart))
            .catch((err) => res.status(404).json({ error: "No Cart found" }));
        }
      }, 1000);
    })
    .catch((err) => res.status(404).json({ error: "end" }));
});

module.exports = router;

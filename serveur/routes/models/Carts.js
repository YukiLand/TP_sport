const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  items: {
    type: Object,
  },
});

module.exports = Question = mongoose.model("cart", CartSchema, "cart");

const mongoose = require("mongoose");

const MaterialsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sport: {
    type: String,
  },
  quantity: {
    type: String,
  },
  color: {
    type: Array,
  },
  image: {
    type: String,
  },
});

module.exports = Question = mongoose.model(
  "material",
  MaterialsSchema,
  "material"
);

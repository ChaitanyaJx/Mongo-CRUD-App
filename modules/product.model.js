const mongoose = require("mongoose");

const prouductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    default: 0,
  },
});

const product = mongoose.model("product", prouductSchema);

module.exports = product;

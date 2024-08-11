const express = require("express");
const productRouter = express.Router();
const {
  createProducts,
  readProducts,
  readProuctfromId,
  updatedProduct,
  deletedProduct,
} = require("../controller/product.controller");

productRouter.post("/", createProducts);

productRouter.get("/", readProducts);

productRouter.get("/:id", readProuctfromId);

productRouter.put("/:id", updatedProduct);

productRouter.delete("/:id", deletedProduct);

module.exports = productRouter;

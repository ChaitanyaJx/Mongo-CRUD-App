const product = require('../modules/product.model');
const createProducts = async(req, res) => {
        try {
          const productData = await product.create(req.body);
          res.status(200).json(productData);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
}

const readProducts = async(req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const readProuctfromId = async(req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const updatedProduct = async(req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deletedProduct = async(req, res) => {
    try {
        const deletedProduct = await product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(deletedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports = {
    createProducts,
    readProducts,
    readProuctfromId,
    updatedProduct,
    deletedProduct
}


const express = require('express');
const route = express.Router();
const productController = require('../controller/productController');

route.get('/',
  productController.getIndex);
route.get('/products',
  productController.getProducts);
route.get('/products/:productId', productController.getProductByID);
route.get('/cart', productController.getCart);
route.post('/cart',
  productController.postCart);
route.post('/cart-delete-item', productController.postCartDeleteProduct
);
route.post('/create-order', productController.postOrder);
route.get('/orders', productController.getOrders);
module.exports = route;
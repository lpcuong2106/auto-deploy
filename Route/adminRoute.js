const express = require('express');
const route = express.Router();
const productController = require('../controller/productController');

route.get('/add-product', productController.addProduct);
route.post('/add-product', productController.addProductPost);

module.exports = route;
const express = require('express');
const route = express.Router();
// const productController = require('../controller/productController');
const adminController = require('../controller/adminController');
const isAuth = require('../middleware/is-auth');

route.get('/add-product',isAuth, adminController.getAddProduct);
route.post('/add-product', isAuth, adminController.addProductPost);

route.get('/products', isAuth, adminController.getProductsAdmin);
route.get('/edit-product/:productId', isAuth, adminController.getEditProducts);
route.post('/edit-product', isAuth, adminController.postEditProduct);
route.post('/delete-product',isAuth, adminController.postDeleteProduct);

module.exports = route;
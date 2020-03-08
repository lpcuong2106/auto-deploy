const express = require('express');
const route = express.Router();
const path = require('path');
const pathRoot = require('../util/path');
const adminRoute = require('./adminRoute');
route.get('/', (req, res, next) => {
  const products = adminRoute.products;
  res.render('shop', {
    prods: products,
    title: 'Product Shop'
  });
})

module.exports = route;
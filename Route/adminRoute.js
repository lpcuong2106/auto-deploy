const express = require('express');
const route = express.Router();
const pathRoot = require('../util/path');
const path = require('path');

const product = [];
route.get('/add-product', (req,res,next) => {
  res.render('add-product')
})
route.post('/add-product', (req,res,next) => {
  product.push({title: req.body.title});
  res.redirect('/');
})

exports.routers = route;
exports.products = product
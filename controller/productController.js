const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      title: 'Product Shop',
      titlePage: 'Products Shop'
    });
  });
  
};
exports.addProduct = (req,res,next) => {
  res.render('add-product', {titlePage: 'Add Product'})
};
exports.addProductPost = (req,res,next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};
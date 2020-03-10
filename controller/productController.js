const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      title: 'Product Shop',
      titlePage: 'Products Shop'
    });
  });
  
};
exports.addProduct = (req,res) => {
  res.render('add-product', {titlePage: 'Add Product'});
};
exports.addProductPost = (req,res) => {
  const title = req.body.title;
  const desciption = req.body.desciption;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};
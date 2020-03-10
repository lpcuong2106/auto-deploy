const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll().then(products => {
    res.render('shop', {
      prods: products,
      title: 'Product Shop',
      titlePage: 'Products Shop'
    });
  }).catch(error =>{
    console.log(error);
  });
  
};
exports.addProduct = (req,res) => {
  res.render('add-product', {titlePage: 'Add Product'});
};
exports.addProductPost = (req,res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  
  const product = new Product(title, description, price, imageUrl);
  product.save();
  res.redirect('/');
};
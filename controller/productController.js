const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      title: 'Product Shop',
      titlePage: 'Products Shop',
      path: '/'
    });
  }).catch(error =>{
    console.log(error);
  });
  
};


exports.getProductByID = (req,res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        titlePage: product.title,
        path: '/products'
      });
    }).catch(err=>console.log(err));
};
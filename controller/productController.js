const Product = require('../models/product');

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list',
        {
          prods: products,
          titlePage: 'All Products',
          path: '/products'
        });
    })
    .catch(error =>{
      console.log(error);
    });
  
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index',
        {
          prods: products,
          titlePage: 'Shop',
          path: '/'
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProductByID = (req,res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail',
        {
          product: product,
          titlePage: product.title,
          path: '/products'
        });
    })
    .catch(err=>console.log(err));
};
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart',
        {
          path: '/cart',
          titlePage : 'Your Cart',
          products: products
        });
    })
    .catch(err => console.log(err));
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      req.user.addToCart(product);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DEsctroyed product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};
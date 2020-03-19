const Product = require('../models/product');
const Order = require('../models/order');
const { response } = require('express');
const { restart } = require('nodemon');

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list',
        {
          prods: products,
          pageTitle: 'All Products',
          path: '/products',
          isAuthenticated: req.session.isLoggedIn,
        });
    })
    .catch(error =>{
      console.log(error);
    });
  
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index',
        {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          isAuthenticated: req.session.isLoggedIn,
          csrfToken: req.csrfToken()
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
          pageTitle: product.title,
          path: '/products',
          isAuthenticated: req.session.isLoggedIn,
        });
    })
    .catch(err=>console.log(err));
};
exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart',
        {
          path: '/cart',
          pageTitle : 'Your Cart',
          products: products,
          isAuthenticated: true,
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
    .removeFromcart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postOrder = (req,res) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return {quantity: i.quantity, product: {...i.productId._doc}};
      });
      let order = new Order({
        user: {
          email: req.user.email,
          userId: req.user._id
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      req.user.clearCart();
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};
exports.getOrders = (req, res) => {
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orthers',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: true
      });
    })
    .catch(err => console.log(err));
};
const Product = require('../models/product');

exports.getEditProducts = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(products => {
      res.render('admin/edit-product',
        {
          product: products,
          titlePage: 'Edit product',
          editing: editMode,
          path: '/admin/edit-product'
        });
    })
    .catch(error =>{
      console.log(error);
    });
};
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      return product.save();
    })
    .then(result => {
      console.log("Updated Product");
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',
    {
      titlePage: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
};
exports.addProductPost = (req,res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const product = new Product({title,
    description,
    price,
    imageUrl,
    userId: req.user
  });
  product.save();
  res.redirect('/');
};
exports.getProductsAdmin = (req, res) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products',
        {
          prods: products,
          title: 'Product Shop',
          titlePage: 'Admin Product',
          path: '/admin/products'
        });
    })
    .catch(error =>{
      console.log(error);
    });
  
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DEsctroyed product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
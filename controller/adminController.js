const Product = require('../models/product');

exports.getEditProducts = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(products => {
      res.render('admin/edit-product', {
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
  const product = new Product(updatedTitle, updatedDesc, updatedPrice, updatedImageUrl, prodId);
  product.save()
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
exports.addProduct = (req,res) => {
  res.render('add-product', {titlePage: 'Add Product', path: '/admin/add-product'});
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
exports.getProductsAdmin = (req, res) => {
  Product.fetchAll().then(products => {
    res.render('admin/products', {
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
  Product.deleteById(prodId).then(() => {
    console.log('DEsctroyed product');
    res.redirect('/admin/products');
  })
    .catch(err => console.log(err));
};
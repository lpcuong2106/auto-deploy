exports.get404page = (req,res) => {
  res.status(404).render('404', {
    titlePage: '404 Not Found', 
    path: '/products'
  });
};
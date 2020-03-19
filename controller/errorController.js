exports.get404page = (req,res) => {
  res.status(404)
    .render('404',
      {
        pageTitle: '404 Not Found', 
        path: '/products',
        isAuthenticated:  req.session.isLoggedIn
      });
};
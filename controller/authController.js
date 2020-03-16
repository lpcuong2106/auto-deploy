const user = require("../models/user");

exports.getLogin =  (req,res, next) => {
  // const isLoggedIn = req.get('Cookie')
  //   .split(';')[3].split('=')[1];
  res.render('auth/login',
    {
      pageTitle: 'Login',
      path: '/login',
      isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req,res,next) => {
  req.session.isLoggedIn = true;
  user.findById('5e6e2cf86f8df33980d70769')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
  // res.setHeader('Set-Cookie', 'isLoggedIn=true');


};
exports.postLogout = (req,res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
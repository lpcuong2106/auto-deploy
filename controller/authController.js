const User = require("../models/user");
const bcryptjs = require("bcryptjs");
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
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if(!user){
        return res.redirect('/login');
      }
      bcryptjs.compare(password, user.password)
        .then(doMath => {
          if(doMath){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err=> {
          console.log(err);
          res.redirect('/login');
        });
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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
    .then(userDoc => {
      if(userDoc){
        return res.redirect('/signup');
      }
      return bcryptjs.hash(password, 12)
        .then(encryptPad => {
          const user = new User({
            email: email,
            password: encryptPad,
            cart: {items: []}
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
     
    })
    
    .catch(err => {
      console.log(err);
    });
};
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const crypto =require('crypto');
exports.getLogin =  (req,res, next) => {
  // const isLoggedIn = req.get('Cookie')
  //   .split(';')[3].split('=')[1];
  let messages = req.flash('error');
  if(messages.length > 0){
    messages = messages[0];
  }else {
    messages = null;
  }
  res.render('auth/login',
    {
      pageTitle: 'Login',
      path: '/login',
      errorMessage: messages
    });
};

exports.postLogin = (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if(!user){
        req.flash('error','Invalid email or password!');
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
          req.flash('error','Invalid email or password!');
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
        req.flash('error','Email esists already, pick all pasword agian!');
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

exports.getReset = (req, res, next) => {
  let messages = req.flash('error');
  if(messages.length > 0){
    messages = messages[0];
  }else {
    messages = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: messages
  });
};

exports.postReset = (req,res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if(!user){
          req.flash('error', 'No account with that email found');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpriration = Date.now() + 360000;
        return user.save();
      })
      .then(result => {
        res.redirect('/login');
        //send mail
        // transporter.sendMail({
        //   to: email,

        // });
        console.log(`http://localhost:2106/reset/${token}`);
      })
      .catch(err => {console.log(err);});
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  console.log('hello');
  User.findOne({resetToken: token, resetTokenExpriration: {$gt: Date.now()}})
    .then(user => {
      if(user){
        let messages = req.flash('error');
        if(messages.length > 0){
          messages = messages[0];
        }else {
          messages = null;
        }
        res.render('auth/new-password', {
          path: '/new-password',
          pageTitle: 'New Password',
          errorMessage: messages,
          userId: user._id.toString(),
          paswordToken: token
        });
      }
      res.redirect('/reset');
    })
    .catch(err => {
      console.log(err);
    });

};


exports.postNewPassword =  (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const paswordToken = req.body.paswordToken;
  console.log(newPassword, userId,paswordToken);
  let resetUser;
  User.findOne({resetToken: paswordToken, resetTokenExpriration: {$gt: Date.now() }, _id: userId})
    .then(user => {
      resetUser = user;
      return bcryptjs.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpriration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => console.log(err));

};

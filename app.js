// const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const adminRoute = require('./Route/adminRoute');
const authRoute = require('./Route/auth');
const bodyParser = require('body-parser');
const errorController = require('./controller/errorController');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
// const monogoConnect = require('./util/database').monogoConnect;
const dotenv = require('dotenv');
const User = require('./models/user');
const mongoose = require('mongoose');
const flash = require('connect-flash');
dotenv.config();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();
app.set('views',
  'view');
app.set('view engine',
  'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,
  'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(csrfProtection);
app.use(flash());
app.use((req,res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user; 
      next();
    })
    .catch(err=> console.log(err));
});
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use('/admin',
  adminRoute);
app.use(shopRouter);
app.use(authRoute);
app.use(errorController.get404page);

// monogoConnect(() => {
//   app.listen(process.env.PORT);
// });

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err=>console.log(err));

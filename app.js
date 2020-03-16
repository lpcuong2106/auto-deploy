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

// const monogoConnect = require('./util/database').monogoConnect;
const dotenv = require('dotenv');
const User = require('./models/user');
const mongoose = require('mongoose');

dotenv.config();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});
app.set('views',
  'view');
app.set('view engine',
  'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,
  'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
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
    User.findOne()
      .then(user => {
        if(!user){
          const user = new User({
            name: 'Cuong',
            email: 'noname21062000@gmail.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
   
    app.listen(process.env.PORT || 3000);
  })
  .catch(err=>console.log(err));

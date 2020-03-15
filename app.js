// const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const adminRoute = require('./Route/adminRoute');
const bodyParser = require('body-parser');
const errorController = require('./controller/errorController');

// const monogoConnect = require('./util/database').monogoConnect;
const dotenv = require('dotenv');
const User = require('./models/user');
const mongoose = require('mongoose');
dotenv.config();

app.set('views',
  'view');
app.set('view engine',
  'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,
  'public')));
app.use((req,res, next) => {
  User.findById("5e6a68dfe0b68a30401c3184")
    .then(user => {
      req.user = new User(user.name,
        user.email,
        user.cart,
        user._id);
      next();
    })
    .catch(err=> console.log(err));
});
app.use('/admin',
  adminRoute);
app.use(shopRouter);
app.use(errorController.get404page);

// monogoConnect(() => {
//   app.listen(process.env.PORT);
// });

mongoose.connect(process.env.MONGO_URI)
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err=>console.log(err));

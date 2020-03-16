// const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const adminRoute = require('./Route/adminRoute');
const authRoute = require('./Route/auth');
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

  User.findById('5e6e2cf86f8df33980d70769')
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

const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const adminRoute = require('./Route/adminRoute');
const bodyParser = require('body-parser');
const errorController = require('./controller/errorController');

const monogoConnect = require('./util/database').monogoConnect;
const dotenv = require('dotenv');
dotenv.config();

app.set('views', 'view');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRoute);
app.use(shopRouter);
app.use(errorController.get404page);

monogoConnect(() => {
  app.listen(process.env.PORT);
});


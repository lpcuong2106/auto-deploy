const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const server = http.createServer(app);
const adminRoute = require('./Route/adminRoute');
const bodyParser = require('body-parser');
const errorController = require('./controller/errorController');
app.set('views', 'view');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRoute);
app.use(shopRouter);

app.use(errorController.get404page);

server.listen(process.env.PORT);

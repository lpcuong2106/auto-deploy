const http = require('http');
const express = require('express');
const shopRouter = require('./Route/shop');
const path = require('path');
const app = express();
const server = http.createServer(app);
const adminRoute = require('./Route/adminRoute');
const bodyParser = require('body-parser');
// app.use((req,res, next) => {
//   console.log('middileware');
//   next();
// });
// app.use((req,res, next) => {
//   console.log('another middileware')
//   res.send('<h1>Hello work</h1>');
// });
app.set('views', 'view');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRoute.routers);
app.use(shopRouter);

app.use((req,res,next) => {
  res.status(404).render('404', {titlePage: '404 Not Found'});
})

// const server = http.createServer((req, res) => {
//   // const url = req.url;
//   // const method = req.method;
//   const url = req.url;
//   const method = req.method;
//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title><head>');
//     res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
//     res.write('</html>');
//     return res.end();
//   }
//   if(url === '/message' && method === 'POST'){
//     req.on('data', function(){
//       fs.writeFile('message.txt', 'DUMMY');
//       res.statusCode = 302;
//       res.setHeader('Location', '/');
//       return res.end(); 
//     })
//   }
  
//   res.setHeader('Content-Type', 'text/html');
//   res.write('<html>');
//   res.write('<head><title>My First Page</title><head>');
//   res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
//   res.write('</html>');
//   res.end();
// });

server.listen(3000);

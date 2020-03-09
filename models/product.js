const products = [];
const path = require('path');
const rootPath = require('../util/path');
const fs = require('fs');

module.exports = class Product{
  constructor(t){
      this.title = t;
  }

  save(){
    const p = path.join(rootPath, 'data', 'product.json');
    fs.readFile(p, (err, contentFile) => {
      let products = [];
      if(!err){
        products = JSON.parse(contentFile);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err)=>{
        console.log(err);
      });
    })
   
  }

  static fetchAll(cb){
    const p = path.join(rootPath, 'data', 'product.json');
    let products = fs.readFile(p, (err, contentFile) => {
      let products = [];
      if(!err){
        return cb(JSON.parse(contentFile));
      }
      return cb(products);
    });
   
  }

}
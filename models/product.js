// const products = [];
const path = require('path');
const rootPath = require('../util/path');
const fs = require('fs');
const getDb = require('../util/database').getDb;
module.exports = class Product{
  constructor(title,description,price,imageUrl){
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
  save(){
    // const p = path.join(rootPath, 'data', 'product.json');
    // fs.readFile(p, (err, contentFile) => {
    //   let products = [];
    //   if(!err){
    //     products = JSON.parse(contentFile);
    //   }
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), (err)=>{
    //     console.log(err);
    //   });
    // })
    const db = getDb();
    return db.collection('products').insertOne(this).then(result => {
      console.log(result);
    }).catch(error => console.log(error));
  }

  static fetchAll(){
    // const p = path.join(rootPath, 'data', 'product.json');
    // let products = fs.readFile(p, (err, contentFile) => {
    //   let products = [];
    //   if(!err){
    //     return cb(JSON.parse(contentFile));
    //   }
    //   return cb(products);
    // });
    const db = getDb();
    return db.collection('products')
      .find().toArray().then(products => {
        return products;
      }).catch(error => console.log(error));
  }

};
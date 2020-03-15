const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
  title: {

  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model('Product',productSchema);
// // const products = [];
// // const path = require('path');
// // const rootPath = require('../util/path');
// // const fs = require('fs');
// const getDb = require('../util/database').getDb;
// const mongoDb = require('mongodb');
// const express = require('express');
// module.exports = class Product{
//   constructor(title,description,price,imageUrl, id, userId){
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save(){
//     // const p = path.join(rootPath, 'data', 'product.json');
//     // fs.readFile(p, (err, contentFile) => {
//     //   let products = [];
//     //   if(!err){
//     //     products = JSON.parse(contentFile);
//     //   }
//     //   products.push(this);
//     //   fs.writeFile(p, JSON.stringify(products), (err)=>{
//     //     console.log(err);
//     //   });
//     // })
//     const db = getDb();
//     let dbOp;
//     if(this._id) {
//       dbOp =  db.collection('products')
//         .updateOne({_id: this._id},
//           { $set: this });
//     }else{
//       dbOp = db.collection('products')
//         .insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     // console.log(result);
//   }
//   static deleteById(prodId){
//     const db = getDb();
//     return db.collection('products')
//       .deleteOne({_id: new mongoDb.ObjectId(prodId)})
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => console.log(err));
//   }
//   static fetchAll(){
//     // const p = path.join(rootPath, 'data', 'product.json');
//     // let products = fs.readFile(p, (err, contentFile) => {
//     //   let products = [];
//     //   if(!err){
//     //     return cb(JSON.parse(contentFile));
//     //   }
//     //   return cb(products);
//     // });
//     const db = getDb();
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(error => console.log(error));
//   }

//   static findById(prodId){
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({_id: new mongoDb.ObjectId(prodId)})
//       .next()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

// };
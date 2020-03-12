// const products = [];
// const path = require('path');
// const rootPath = require('../util/path');
// const fs = require('fs');
const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');
const express = require('express');
module.exports = class Product{
  constructor(title,description,price,imageUrl, id){
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id;
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
    let dbOp;
    console.log(dbOp);
    if(this._id) {
      dbOp =  db.collection('products').updateOne({_id: new mongoDb.ObjectId(this._id)}, { $set: this });
    }else{
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(result);
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

  static findById(prodId){
    const db = getDb();
    return db
      .collection('products')
      .find({_id: new mongoDb.ObjectId(prodId)})
      .next()
      .then(products => {
        console.log(products);
        return products;
      }).catch(err => console.log(err));
  }

};
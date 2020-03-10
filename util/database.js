const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const monogoConnect = callback => {
    MongoClient.connect('mongodb+srv://cuongle:08081508@cluster0-sxm8x.mongodb.net/shop?retryWrites=true&w=majority')
      .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
      }).catch(error => {
        console.log(error);
        throw error;
      });
};
const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No database found!';
}

exports.monogoConnect = monogoConnect;
exports.getDb = getDb;
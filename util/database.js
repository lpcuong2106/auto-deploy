const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const monogoConnect = callback => {
  MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
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
};

exports.monogoConnect = monogoConnect;
exports.getDb = getDb;
const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
//const URI = 'mongodb+srv://rachelvargas:mongoRachel@cluster0.ypiaab5.mongodb.net/?retryWrites=true&w=majority';
let db;

const connectDb = (callback) => {
  if(db){
    console.log("database connected!");
    return callback(null, db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
  .then((client) => {
    db = client;
    callback(null, db);
  })
  .catch((err) => {
    callback(err)
  });
};

const getDb = () => {
  if (!db) {
    throw Error('Db not connected!');
  }
  return db;
};

//module.exports =  {connectDB, getDb}
module.exports =  {
  connectDb, 
  getDb
};

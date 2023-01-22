/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

getDirectors = async(req, res, next) => {
  const result = await mongodb
  .getDb()
  .db("grossessMovies")
  .collection('directors')
  .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
    console.log(lists);
  });
};

module.exports = { getDirectors }
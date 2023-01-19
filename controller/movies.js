/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

getData = async(req, res, next) => {
  const result = await mongodb
  .getDb()
  .db("grossessMovies")
  .collection('movies')
  .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
    console.log(lists);
  });
};

const getOne = async(req, res, next) => {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb 
    .getDb()
    .db("grossessMovies")
    .collection('movies')
    .find({_id: movieId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        console.log(lists);
    });
};

const newMovie = async(req, res) => {
  const movie = 
  {                                                     
    rank: req.body.rank,
    title: req.body.title,
    director: req.body.director,
    yearRelease: req.body.yearReleaser,
    rated: req.body.rated,
    budget: req.body.budget,
    lifeTimeGross: req.body.lifeTimeGross

  };
  const response = await mongodb
  .getDb()
  .db("grossessMovies")
  .collection('movies')
  .insertOne(movie);
  res.setHeader('Content-Type', 'application/json');
  if (response.acknowledged) {
    res.status(201).json(response);
    console.log(response);
  } else {
    res.status(500).json(response.error || 'Error: The movie could not be update.');
  }
};

const updateMovie = async(req, res) => {
  const movieId = new ObjectId(req.params.id);
  const movie =
  {                                                     
    rank: req.body.rank,
    title: req.body.title,
    director: req.body.director,
    yearRelease: req.body.yearReleaser,
    rated: req.body.rated,
    budget: req.body.budget,
    lifeTimeGross: req.body.lifeTimeGross


  };
  
const response = await mongodb
.getDb()
.db("grossessMovies")
.collection('movies')
.replaceOne({_id: movieId}, movie);
res.setHeader('Content-Type', 'application/json');
if (response.modifiedCount > 0) {
  res.status(204).send();
  console.log(response);
} else {
  res.status(500).json(response.error || 'Error: The movie could not be update.');
}
};
const deleteMovie = async(req, res) => {
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb 
  .getDb()
  .db("grossessMovies")
  .collection('movies')
  .deleteOne({_id: movieId}, true); 
  res.setHeader('Content-Type', 'application/json');  
  if (response.modifiedCount > 0) {
    res.status(200).send();
    console.log(response);
  } else {
    res.status(500).json(response.error || 'Error: The movie could not be deleted.');
  }
};

module.exports = { getData, getOne, newMovie, updateMovie, deleteMovie }

/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator');

const getData = async (req, res, next) => {
  try {
  const result = await mongodb
  .getDb()
  .db("grossessMovies")
  .collection('movies')
  .find();
  console.log(result)  
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
    console.log(lists);
  }); //.catch(error => error)
} catch (error) {
  //return res.status(500).json(error || 'Error: The movie could not be get.');
  console.error(error  || 'Error: The movie could not be get.')
}
};

const getOne = async(req, res, next) => {
  try {
    /*if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id.');
    }*/
    const movieId = new ObjectId(req.params.id);
    console.log(movieId);
    /*if (!movieId){
      throw new Error('There is no an id')
    }*/
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
  } catch (error) {
    res.status(500).json({error:"this is not working"});
    //console.error(error);
  }
};

const newMovie = async (req, res) => {
const errors = validationResult(req)
if (!errors.isEmpty()){
  return res.status(422).json({
    errors: errors.array()
  })
} try {
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
    res.status(204).json(response);
    console.log(response);
  } else {
    res.status(500).json(response.error || 'Error: The movie could not be update.');
    console.log(error)
  }
} catch(error){
  return res.status(500).json(error || 'Error: The movie could not be update.');
  console.log(error)
} /*finally {
  await cleanUp()
} */
};

const updateMovie = async(error, req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid id.');
    }
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
} catch(error){
  return res.status(500).json(error || 'Error: The movie could not be update.');
  console.log(error)
}
};
const deleteMovie = async(error, req, res) => {
  try {
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
} catch (error) {
  return res.status(500).json(error || 'Error: The movie could not be update.');
  console.log(error);

}
};
module.exports = { getData, getOne, newMovie, updateMovie, deleteMovie }

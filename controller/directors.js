/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const username = require('mongodb').username;
const {validationResult} = require('express-validator');


const getDirectors = async(req, res, next) => {
  try {
  const result = await mongodb
  .getDb()
  .db("grossessMovies")
  .collection('directors')
  .find();
  console.log(result) 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
    console.log(lists);
  });
} catch (error) {
  //return res.status(500).json(error || 'Error: The movie could not be get.');
  console.error(error  || 'Error: The director could not be get.')
}
};

const newDirector = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(422).json({
      errors: errors.array()
    })
  } try {
    const director =
    {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      birthday: req.body.birthday,    
      nationality: req.body.nationality,
      knownFor: req.body.knownFor
  
    };
    const response = await mongodb
    .getDb()
    .db("grossessMovies")
    .collection('directors')
    .insertOne(director);
    res.setHeader('Content-Type', 'application/json');
    if (response.acknowledged) {
      res.status(204).json(response);
      console.log(response);
    } else {
      res.status(500).json(response.error || 'Error: The director could not be update.');
      console.log(error)
    }
  } catch(error){
    return res.status(500).json(error || 'Error: The director could not be update.');
    console.log(error)
  } 
  };
  
  const updateDirector = async(req, res) => {
    try {
      if (!username.isValid(req.params.username)) {
        res.status(400).json('Invalid username.');
      }
    const username = new username(req.params.username);
    const director = 
    {                                                     
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      birthday: req.body.birthaday,    
      nationality: req.body.nationality,
      knownFor: req.body.knownFor
  
    };
    const response = await mongodb
    .getDb()
    .db("grossessMovies")
    .collection('directors')
    .replaceOne({username: username}, director);
    res.setHeader('Content-Type', 'application/json');
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(response);
    } else {
      res.status(500).json(response.error || 'Error: The director could not be update.');
    }
  } catch(error) {
    return res.status(500).json(error || 'Error: The director could not be update.');
    console.log(error)
  }
  };

module.exports = { getDirectors, newDirector, updateDirector }
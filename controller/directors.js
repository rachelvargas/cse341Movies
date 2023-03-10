/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    birthday: { type: String, required: true },
    nationality: { type: String },
    knownFor: {type: String},
 });
 
 module.exports = mongoose.model('Director', directorSchema);


const getDirectors = async (req, res, next) => {
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
    }); //.catch(error => error)
  } catch (error) {
    //return res.status(500).json(error || 'Error: The movie could not be get.');
    console.error(error  || 'Error: The movie could not be get.')
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
          name: req.body.name,
          birthday: req.body.birthday,
          nationality: req.body.nationality,
          knownFor: req.body.knownFor
        };
      const response = await mongodb
      .getDb()
      .db("grossessMovies")
      .collection('directors')
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
    } 
    };    
    const updateDirector = async(error, req, res) => {
      try {
        if (!ObjectId.isValid(req.params.id)) {
          res.status(400).json('Invalid id.');
        }
        const directorId = new ObjectId(req.params.id);
        const director =
        {
          name: req.body.name,
          birthday: req.body.birthday,
          nationality: req.body.nationality,
          knownFor: req.body.knownFor
        };
        const response = await mongodb
        .getDb()
        .db("grossessMovies")
        .collection('directors')
        .replaceOne({_id: directorId}, director);
        res.setHeader('Content-Type', 'application/json');
        if (response.modifiedCount > 0) {
          res.status(204).send();
          console.log(response);
        } else {
          res.status(500).json(response.error || 'Error: The director could not be update.');
        }
      } catch(error){
        return res.status(500).json(error || 'Error: The director could not be update.');
        console.log(error)
      }
    };
  
module.exports = { getDirectors, newDirector, updateDirector }
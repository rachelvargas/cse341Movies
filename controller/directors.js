/**Call Mongodb and return the data */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator');
const Director = db.directors;


const getDirectors = async(req, res) => {
  try {
    Director.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
  
const newDirector = async (req, res) => {
  /*const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(422).json({
      errors: errors.array()
})*/
const errors = validationResult(req)
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
      //const password = req.body.password;
     
  const director = new Director(req.body);
  director
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
}
};
  
    
  const updateDirector = async(req, res) => {
    try {
    const username = new (req.params.username);
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
    }
    Director.findOne({ username: username }, function (err, director ) {
      director.username = req.params.username;
      director.password = req.body.password;
      director.name = req.body.name;
      director.birthday = req.body.birthday;
      director.nationality = req.body.nationality;
      director.knownFor: req.body.knownFor;
      director.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the contact.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};    

module.exports = { getDirectors, newDirector, updateDirector }
const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');

const  { movieValidation }  = require('./validation.js');


router.get('/', movieController.getData);

router.get('/:id', movieController.getOne);

router.post('/', movieValidation, movieController.newMovie);

router.put('/:id', movieValidation, movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
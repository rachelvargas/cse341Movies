const express = require('express');
const router = express.Router();
const contactController = require('../controller/movies');

router.get('/', contactController.getData);

router.get('/:id', contactController.getOne);

router.post('/', contactController.newMovie);

router.put('/:id', contactController.updateMovie);

router.delete('/:id', contactController.deleteMovie);

module.exports = router;
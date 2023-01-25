const express = require('express');
const router = express.Router();
const directorController = require('../controller/directors');

const { directorValidation } = require('./validation.js');


router.get('/', directorController.getDirectors);

router.post('/', directorValidation, directorController.newDirector);

router.put('/:username', directorValidation, directorController.updateDirector);

//router.get('/:id', movieController.getOne);

module.exports = router;

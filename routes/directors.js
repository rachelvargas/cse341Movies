const express = require('express');
const router = express.Router();
const directorController = require('../controller/directors');

const { directorValidation } = require('./validation.js');


router.get('/:name', directorController.getDirectors);

//router.get('/:id', movieController.getOne);

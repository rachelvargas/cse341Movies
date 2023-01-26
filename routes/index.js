const express = require('express');
const router = express.Router();

router.use('/movies', require('./movies.js'));
router.use('/directors', require('./directors.js'));

//router.use('/directors', require('./directors.js'));
router.use("/", require("./swagger"));


module.exports = router;

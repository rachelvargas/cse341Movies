const express = require('express');
const router = express.Router();

router.use('/movies', require('./movies.js'));
//router.use('/directors', require('./directors.js'));
router.use("/", require("./swagger"));
router.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'http://localhost:8080/api-docs',
      };
      res.send(docData);
    })
  );

module.exports = router;

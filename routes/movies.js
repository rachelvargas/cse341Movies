const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');

const  { movieValidation }  = require('./validation.js');

/*const { auth } = require('express-openid-connect');
router.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,                           
    baseURL: process.env.BASE_URL,                                                     
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,           
    idpLogout: true

  })
);
*/

router.get('/', movieController.getData);

router.get('/:id', movieController.getOne);

router.post('/',  movieValidation, movieController.newMovie);

router.put('/',  movieValidation, movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
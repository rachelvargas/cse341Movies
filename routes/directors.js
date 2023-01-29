const express = require('express');
const router = express.Router();
const directorController = require('../controller/directors');

const { directorValidation } = require('./validation.js');

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
);*/

router.get('/', directorController.getDirectors);

router.post('/', directorValidation, directorController.newDirector);

router.put('/:id', directorValidation, directorController.updateDirector);

//router.get('/:id', movieController.getOne);

module.exports = router;

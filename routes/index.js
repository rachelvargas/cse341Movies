const express = require('express');
const router = express.Router();

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

router.use('/movies', require('./movies.js'));
router.use('/directors', require('./directors.js'));

//router.use('/directors', require('./directors.js'));
router.use("/", require("./swagger"));


module.exports = router;


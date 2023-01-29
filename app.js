const express = require('express');
const app = express();
//const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;
const mongodb = require('./db/connect');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
//const MongoClient = require('mongodb').MongoClient;
const Movie = require('./movies');
const Director = require('./directors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

//applying auth security
const config = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.ISSUER_BASE_URL,                           
  baseURL: process.env.BASE_URL,                                                     
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,           
  idpLogout: true

};


//conDB.connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  
  app.use('/', router);

mongodb.connectDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});



// establish a connection to the mongo database with mongoose
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true }, (err, res) => {
     if (err) {
        console.log('Connection failed: ' + err);
     }
     else {
        console.log('Connected to database!');
     }
  }
);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


app.get('/movies',  requiresAuth(), (req, res) => {
  console.log(req)
  Movie.find()
  .then(movies => {
    res.status(200).json(movies)
  }).catch(err => {
    res.status(500).json({ message: 'An error occured', error: err })
  })
})

app.get('/directors',  requiresAuth(), (req, res) => {
  console.log(req)
  Director.find()
  .then(directors => {
    res.status(200).json(Directors)
  }).catch(err => {
    res.status(500).json({ message: 'An error occured', error: err })
  })
})

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
/*app.listen(port, () => {
  console.log(`listening on port ${port}`);
});*/

/////////////////////////////////////////////////////



/*const { auth } = require('express-openid-connect');
app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,                           
    baseURL: process.env.BASE_URL,                                                     
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,           
    idpLogout: true
  })
);*/

/**issuerBaseURL: 'https://DOMAIN',                           
    baseURL: 'https://APPLICATION_ROOT_URL',                                                     
    clientID: 'https://CLIENT_ID',
    secret: 'https://LONG_RANDOM_STRING',           
    idpLogout: true */

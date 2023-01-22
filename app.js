const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
//const MongoClient = require('mongodb').MongoClient;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


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


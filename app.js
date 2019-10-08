//CALL THE PACKAGE--------------------------------
const express = require('express'); // call express
const app = express(); //define our app using express
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// connect to database
mongoose.connect('mongodb://phungdaihiep:thanghiep001@expressjsstepbystep-shard-00-00-imj2g.mongodb.net:27017,expressjsstepbystep-shard-00-01-imj2g.mongodb.net:27017,expressjsstepbystep-shard-00-02-imj2g.mongodb.net:27017/expressjsstepbystep?ssl=true&replicaSet=ExpressJsStepByStep-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.Promise = global.Promise;
//APP CONFIGURATION 
//use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//config our app  to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With, content-type, Authorization');
    next();
});
//log all requests to the console
app.use(morgan('dev'));

//ROUTES for our API
//// IMPORT ROUTES
const usersRouters = require('./api/routes/users');
////

app.use('/users', usersRouters);

//handling error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


//EXPORT APP
module.exports = app;
//===========================//
//Basic Nodejs Server.
//Description about your app.
//Author / Email
//===========================//

//===========================//
//Requires and variables
//===========================//
process.env.NODE_ENV 	= process.env.NODE_ENV || 'development';
const PORT 				= process.env.PORT || 3000;
const express           = require('express')();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const async 	        = require('async'); 
const fs                = require('fs'); 			
const config            = require('./config').config; 
const RateLimit 		= require('express-rate-limit');
const logger 			= require('heroku-logger');
const morgan 			= require('morgan');


//===========================//
//Rate Limit
//https://www.npmjs.com/package/express-rate-limit
//===========================//
express.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
 
var limiter = new RateLimit({
  windowMs	: 1*60*1000, // 15 minutes
  max		: 10, // limit each IP to 100 requests per windowMs
  delayMs	: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
express.use(limiter);

//===========================//
//Middleware / Sets
//===========================//
express.use(bodyParser.json({ limit : '50mb' }));
express.use(bodyParser.urlencoded({ limit : '50mb', extended : true }));
express.use(morgan('combined')); // For logs

mongoose.Promise 		= require('bluebird');
const server 			= express.listen(PORT, () => console.log(`Listening on ${ PORT }`));

//===========================//
//Modules
//===========================//
var basicModel			= require('./models/basicmodel')(mongoose);

//===========================//
//Routes
//===========================//
var basicRoute         	= require('./routes/basicroute')(express, mongoose, async, basicModel);


//===========================//
//Database and Connection
//===========================//
mongoose.connect(config.mongoURI, {useMongoClient: true});

// Database state
var db = mongoose.connection;

// DB connection success
db.on('connected', function() {
	logger.info('Mongoose successfully connected to MongoDB. ', { environment: process.env.NODE_ENV })
});

// DB connection error
db.on('error', function(error) {
	logger.error('Mongoose connection error:', { argument: 'error', value: error })
});
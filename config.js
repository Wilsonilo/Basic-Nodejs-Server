// Staging / Development
var development =  {
	appAddress : '127.0.0.1',
	env        : process.env.NODE_ENV || 'development',
	mongoURI   : 'mongodb://127.0.0.1:27017/gasolinerias'
};

// Production
var production =  {
    appAddress : 'preciosgasolinamx.herokuapp.com',
    env        : process.env.NODE_ENV || 'production',
    mongoURI   : process.env.MONGODB_URI
};

// Determine environment
var environment;

if (process.env.NODE_ENV === 'development') {
    environment = development;
} else {
	environment = production;
}


// Set config
exports.config = environment;
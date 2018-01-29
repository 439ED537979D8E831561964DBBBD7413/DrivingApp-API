'use strict';

var express     = require('express')
var app         = express();
const http      = require('http');
var cors        = require('cors')
var socketio    = require('socket.io');
// Routes for our APIs 
var routes      = require('./API/routes/index'); //importing the routes
var mongoose    = require('mongoose');
var config      = require('./config/config'); // get our config file
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mdauth      = require('./API/middlewares/auth'); 
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens

var login = require('./API/routes/login')
var notify = require('./NotificationsServer/notify')

var cb = require('ocb-sender')
cb.config(`http://${config.context}`,1026,'v2')

// Database configuration
mongoose.Promise = global.Promise;
//Mongoose's default connection logic in versions >= 4.11.0. 
mongoose.connect(config.database,{
  useMongoClient: true,
  /* other options */
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//CORS
app.use(cors())

//Express middleware - This will ensure that the middleware runs before the routes.
/*app.use(function (req, res, next) { 
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});*/

// Route middleware to verify a token
/*app.use(function(req, res, next) {
  mdauth.verifyToken(req, res, next);
});*/

//ROUTES HERE
// ROUTES FOR OUR API
// =============================================================================
app.use('/api', routes)

app.route('/notify')
	.post(notify)

app.route("/mobile/login")
    .post(login);

//Middleware to catch and handle a 404 error
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

/* Configuracion del puerto*/
const port = process.env.PORT || '4000';// used to create, sign, and verify tokens
app.set('port', port);
/* Creacíon del servidor http */
var server = http.createServer(app);

/*Creción del servidor de sockets*/
var io = socketio.listen(server); //Inicializa Sokect Io
app.set('socketio', io); //Crea variable grobal en express del socket
app.set('server', server); //Crea variable global en express del server

/* Servidor en escucha de acuerdo al puerto especificado.*/
app.get('server').listen(port, () => console.log(` Web Server started on:${port}`));

/*Utiliza los sockets directamente sin variables globales*/
require('./NotificationsServer/socketServer')(app.get('socketio')); 

module.exports = app;

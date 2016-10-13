/* seting up server file
express middleware.*/

// Dependencies
// ============
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var session = require('express-session'); 

// Our model controllers (rather than routes)
var routes = require('./controllers/burger_controller');
var application_controller = require('./controllers/application_controller');
var burger_controller = require('./controllers/burger_controller');

// Express settings
// ================

// instantiate our app
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

// view engine setup		
app.set('view engine', 'handlebars');


// app.use('/', routes);
app.use('/', application_controller);
app.use('/burgers', burger_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

// Express can launch a www executable to handle certain tasks.
// www goes in bin (sometimes .bin to keep it hidden)

// This way, we can set certain properties here
// rather than having them take up space in server.js.
// var debug = require('debug')('express-example');

// we bring in the app we exported from server.js
// var app = require('../server');


//listen in bin/www !!!






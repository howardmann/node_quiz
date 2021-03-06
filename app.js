var compression = require('compression');
var express = require('express');
var methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// compress all requests
app.use(compression())

// add all routes
// view engine setup
app.engine('hbs', require('express-handlebars')({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ADD METHOD OVERRIDE TO ALLOW FORMS TO SUBMIT DELETE AND PUT REQUESTS
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // Heroku Keep Alive Ping
// var http = require('http'); //importing http
// setInterval(function() {
//     http.get('http://backbone-quiz.herokuapp.com', function(res) {
//         if (res.statusCode !== 200) {
//             console.log('Heroku Keep Alive Ping: Error - Status Code ' +
//                 res.statusCode);
//         }
//     }).on('error', function(err) {
//         console.log('Heroku Keep Alive Ping: Error - ' + err.message);
//     });
// }, 29 * 60 * 1000); // load every 29 minutes



module.exports = app;

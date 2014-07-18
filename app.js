/*
 * Dependencies & app setup
 */
var express         = require('express'),
    path            = require('path'),
    favicon         = require('static-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),

    routes          = require('./routes/index'),
    users           = require('./routes/users'),

    app             = express();

/*
 * Express setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Routes
 */
app.use('/', routes);
app.use('/users', users);

/*
 * Express error handlers
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err     = new Error('Not Found');
    err.status  = 404;
    next(err);
});
// Development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// Production error handler, no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

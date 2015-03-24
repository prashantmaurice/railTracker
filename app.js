require('./lib/init/init_app.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var scraper = require('./routes/scraper');
//var dataRoutes = require('./routes/data');
var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/cdn/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// Setting Login Essentials
//var passport = require('./lib/login/loginSetup')(app);


app.use('/', routes);
app.use('/scraper', scraper);
//app.use('/cms', cms);
//app.use('/messenger', messenger);
//app.use('/data', dataRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//var cron = require('cron');
//var cronJob = cron.job("0 0 */3 * * *", function(){
//    //sec:Min:Hours:Day of Month:Months:Day of Week:
//    var ScraperAPI = require('./lib/scraperAPI.js');
//    (new ScraperAPI()).refreshAllCoupons({}).success(function(result) {
//        console.logger.debug(result);
//    }).failure(function(err) {
//        console.logger.debug(err);
//    });
//});
//cronJob.start();

//var debug = require('debug')('admin-dashboard');

app.set('port', process.env.NODE_PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

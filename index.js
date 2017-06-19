import bodyParser from 'body-parser';
import logger from 'morgan';
import express from 'express';
import router from './routes/router.config';
import mongooseConnection from './config/mongoose.config';
import 
const app = express();

/**
 * middle ware mounting
 * http logger 
 */

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router mounting
app.use('/',auth)
app.use('/',router);

//404 error handler 
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 


/**
 * Error handlers
 * development error handler
 * will print stacktrace
 * internal server error handler
 */

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
       /* res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}else{
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send("Unable to process your request at this point of time, please try in some time!");
       /* res.render('error', {
            message: err.message,
            error: err
        });*/
    }); 
}
module.exports = app;
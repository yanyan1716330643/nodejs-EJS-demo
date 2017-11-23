var express = require('express');
var path = require('path');
var app = express();
var testRoutes = require('./routes/test');
var index = require('./routes/index');
var favicon = require('serve-favicon');
var logger = require('morgan');
var redisClient = require('./redisClient.js');
var cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use("/test1",testRoutes);
app.use('/', index);
app.use('/user',restrict);
app.use('/user',admin);

function restrict(req,res,next) {
    var flag = false;
    var userName = req.query.user;
    console.log(userName);
    redisClient.hget("nodejs:user:AllUsers","yanyan2",function(err,value){
        console.log("ok");
        console.log(err,value);
    });
    res.setHeader("Set-Cookie","foo=ad");

    res.end();
    // if(flag){
    //     next();
    // }else{
    //     //todo err
    // }

}

function admin(req,res,next) {
    switch (req.url){
        case '/':
            res.end('is ...');
            break;
        case '/a':
            res.end('is a');
            break;
        case '/b':
            res.end('is b');
            break
        default:
            res.end('is default');
            break;
    }

}



module.exports = app;




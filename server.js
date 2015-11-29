var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/cs5610/formBuilderApp';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.bodyParser());
app.use(session({secret: 'this is secret', resave: false, saveUninitialized: false}));
app.use(cookieParser("this is secret"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var userModel = require("./public/project/server/models/user.model.js");
passport.use(new LocalStrategy(
    function(username, password, done)
    {
        userModel.findUserByUserName({username: username, password: password}, function(err, user)
        {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        })
    }));

passport.serializeUser(function(user, done)
{
    done(null, user);
});

passport.deserializeUser(function(user, done)
{
    userModel.findById(user._id, function(err, user)
    {
        done(err, user);
    });
});

require("./public/project/server/app.js")(app, mongoose, passport);
require("./public/assignment/server/app.js")(app, mongoose, db);
app.listen(port, ipaddress);

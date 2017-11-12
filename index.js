var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/moviejunkies', { useMongoClient: true });


var server_port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/genre', function(req,res){
    res.sendFile(__dirname + '/views/genre.html');
});
app.get('/decade', function(req,res) {
    res.sendFile(__dirname + '/views/decade.html');
});
app.get('/login', function(req,res) {
    res.sendFile(__dirname + '/views/loginPage.html');
});
app.get('/genre/horror', function(req,res) {
    res.sendFile(__dirname + '/views/horrorPage.html');
});
app.listen(server_port, function() {
    console.log("Listening on port : " + server_port);
});

module.exports = app;
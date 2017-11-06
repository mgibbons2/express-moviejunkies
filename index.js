var express = require('express');
var app = express();
var path = require('path');
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
app.listen(server_port, function() {
    console.log("Listening on port : " + server_port);
});
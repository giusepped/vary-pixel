var express = require("express");
var app = express();

app.use(express.static('public'));

var server = require('http').Server(app);

server.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// check out why it does not work when using just 'canvas.html' without public
app.get('/canvas', function(req, res) {
  res.sendfile('public/canvas.html');
});
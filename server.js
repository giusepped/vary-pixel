var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Parse = require('parse/node').Parse;

Parse.initialize("U5tqKkqGtSb4VBBDRGmmtpjofTvtoyyrpWkN4BN8", "f5qinAxXHxneK1rrw8NPn787gglu20AGl6S0PeuD");

app.use(express.static('./public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

server.listen(process.env.PORT || 3000);

var canvasesArray = [];

app.get('/', function(req, res) {
  res.render('views/index.jade');
});

io.on('connection', function(socket) {
  socket.on('join', function(canvas) {
    socket.join(canvas);
    console.log("connecting to canvas " + canvas);
  });

  socket.on('leave', function(canvas) {
    socket.leave(canvas);
    console.log("leaving canvas " + canvas);
  })

  socket.on('coordinates', function(data) {
    socket.broadcast.to(data[3]).emit('coordinates', data);
  });
});

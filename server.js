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

var canvases = {};

app.get('/', function(req, res) {
  res.render('views/index.jade');
});

io.on('connection', function(socket) {
  socket.on('join', function(canvas) {
    canvases[canvas]= 'hi';
    console.log(canvasesArray);
    socket.join(canvas);
  });

  socket.on('leave', function(canvas) {
    socket.leave(canvas);
  })

  socket.on('coordinates', function(data) {
    socket.broadcast.to(data[3]).emit('coordinates', data);
  });

  socket.on('canvas', function(data) {
  });
});

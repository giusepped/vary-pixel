var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('.'));

server.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// check out why it does not work when using just 'canvas.html' without public
app.get('/canvas', function(req, res) {
  res.sendfile('canvas.html');
});

io.on('connection', function(socket) {
  socket.on('coordinates', function(data) {
    socket.broadcast.emit('coordinates', data);
  });
});
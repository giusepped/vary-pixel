var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('./public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

server.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendfile('views/index.jade');
});

io.on('connection', function(socket) {
  socket.on('coordinates', function(data) {
    socket.broadcast.emit('coordinates', data);
  });
});

var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Parse = require('parse/node').Parse;
var username;
var users = [];
var imgID;

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
  socket.on('join', function(data) {
    imgID = data[0];
    socket.join(imgID);
    username = data[1];
    // users.push({ socket.id: username });
    console.log(username + " joined " + imgID);
    socket.broadcast.to(imgID).emit('chat message', username + ' has joined the room');
    socket.emit('chat message', 'Welcome to the room ' + username + '!');
  });

  socket.on('leave', function(data) {
    imgID = data[0];
    username = data[1];
    socket.broadcast.to(imgID).emit('chat message', username + ' has left the room');
    socket.leave(imgID);
  })

  socket.on('coordinates', function(data) {
    socket.broadcast.to(data[3]).emit('coordinates', data);
  });
});

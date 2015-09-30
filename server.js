var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Parse = require('parse/node').Parse;
var username;
var users = [];
var imgID;
var unsavedCoordinates = [];

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
  socket.on('joinRoom', function(data) {
    imgID = data[0];
    socket.join(imgID);
    username = data[1];
    users.push({ name: username, id: socket.id , roomID: imgID });
    socket.broadcast.to(imgID).emit('chat message', username + ' has joined the room');
    socket.emit('chat message', 'Welcome to the room ' + username + '!');
    socket.emit('unsaved coordinates', unsavedCoordinates);
    for (var i = 0; i < users.length - 1; i++) {
      if (users[i]["roomID"] === imgID) {
        socket.emit('chat message', users[i]["name"] + " is drawing too");
      }
    }
  });

  socket.on('chat message', function(data) {
    imgID = data[2];
    username = data[1];
    io.to(imgID).emit('chat message', username + ":" + data[0]);
  });

  socket.on('leaveRoom', function(data) {
    imgID = data[0];
    username = data[1];
    socket.broadcast.to(imgID).emit('chat message', username + ' has left the room');

    for (var i = 0; i < users.length; i++) {
      if (socket.id === users[i]["id"]) {
        users.splice(i, 1);
      }
    }
    unsavedCoordinates = [];
    socket.leave(imgID);
  });

  socket.on('coordinates', function(data) {
    imgID = data[3];
    socket.broadcast.to(imgID).emit('coordinates', data);
    unsavedCoordinates.push([data[0], data[1], data[2]]);
  });

});

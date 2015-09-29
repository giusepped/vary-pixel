var socket = io();

socket.on('chat message', function(msg) {
  $('.messages').append($('<li>').text(msg));
});


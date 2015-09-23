var chai = require('chai');
var mocha = require('mocha');
var io = require('socket.io-client');
var server = require('../../server').server;

var should = chai.should();
var socketURL = 'http://localhost:3000'
var options = {
  transports: ['websocket'],
  'force new connection': true
};

var coords = [42, 51];

describe('Server', function() {

  xit('should receive coordinates from client', function(done) {

    var client1 = io.connect(socketURL);

    client1.on('coordinates', function(data) {
      client1.emit('coordinates', coords);

      //var client2.on('coordinates', function(data))
      data.should.be.type('array');
      // data.should.equal(coords);
      client.disconnect();
      done();
    });
    done();
  });
});

#!/usr/local/bin/node

// Node.js tutorial sample
//
// tcp/ip socket echo server

var net = require('net');
var sockets = [];
var s = net.Server(function(socket) {
  sockets.push(socket);

  socket.on('data', function(d) {
    for (var i = 0; i < sockets.length; ++i) {
      sockets[i].write("echo[" + i + "]:" + d);
    }
  });

  socket.on('close', function() {
    var i = sockets.indexOf(socket);
    console.log('on close:' + i);
    sockets.splice(i, 1);
  });

  // terminating listening process triggers error event; must handle
  socket.on('error', function(ex) {
    console.log('ignoring exception: ' + ex);
  });
});

s.listen(8000);
console.log("Server is listening");

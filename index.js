var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// types of socket broadcasts
// TODO: add to documentaiton

//socket.emit - only self
//io.emit - all
//io.sockets.emit - untested - all
//socket.broadcast.emit

io.on('connection', function (socket) {
  
  console.log('a user connected');
  io.emit('chat message', 'A user connected');
  
  socket.on('disconnect', function () {
    console.log('user disconnected');
    io.emit('chat message', 'A user disconnected');
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (payload) {

    console.log('message: ' + payload.msg);
    socket.broadcast.emit('chat message',
      `${payload.nickname}:${payload.msg}`);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
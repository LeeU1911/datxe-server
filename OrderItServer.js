var express = require('express');
var app = express();

const PORT= process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('{"response":"success"}');
});

app.post('/', function (req, res) {
	req.on('data', function(data){
		console.log(data);
	});

  res.send('{"response":"success"}');
});

var server = app.listen(PORT, function () {
  console.log('OrderIt app listening on port %s!', PORT);
})

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected with id %s', socket.id);
  io.emit('handshake', 'it\'s me, server');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

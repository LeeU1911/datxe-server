var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const ENDPOINT = {
    order: "/v1/order"
};



app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('{"response":"success"}');
});

app.post('/', function (req, res) {
    console.log("request body ");
    console.dir(req.body);
    var username = req.body.username;
    if (username == 'staff2') {
        res.send('{"response":"failure"}');
    } else if (username == 'staff3') {
        res.send('{"response":"notfound"}');
    } else {
        res.send('{"response":"success"}');
    }
});

var server = app.listen(PORT, function () {
    console.log('OrderIt app listening on port %s!', PORT);
})

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected with id %s', socket.id);
    io.emit('handshake', 'it\'s me, server');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

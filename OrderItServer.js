var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pgp = require("pg-promise")();

const PORT = process.env.PORT || 8080;
const ENDPOINT = {
    order: "/v1/order"
};

var db = pgp("postgres://postgres:1234@localhost:5432/floreant");


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

app.use(ENDPOINT.order, function(req, res) {
    //app.use(bodyParser.json());
    console.log(req.body);
    db.none("INSERT INTO ticket_item(item_id, item_count, item_name, group_name, category_name, item_price, discount_rate, item_tax_rate, sub_total, sub_total_without_modifiers, discount, tax_amount, tax_amount_without_modifiers, total_price, total_price_without_modifiers, beverage, inventory_handled, print_to_kitchen, has_modiiers, printed_to_kitchen, ticket_id, pg_id, item_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,  $21, $22, $23)", [0, 1, 'mon order it', "Trương mục khác", "Trương mục khác", 60, 0, 6, 60, 60, 0, 3.6000000000000001, 3.6000000000000001, 63.600000000000001, 63.600000000000001, 'f', 'f', 't', 'f', 'f', 4, null, 0])
        .then(function () {
            console.log("Inserted");
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });

    res.send('{"response":"success"}');
})

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

var path = require('path');
var bodyparser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./mydb.sqlite"
    }
  });

var port = process.env.PORT || 3000;
let users = [];
let rooms = 0;
//app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res){
    res.send("<h1>hello</h1>");
});
let addUser = function(id) {
    console.log(id);
    users.push(id);
}

let removeUser = function(id) {
    var i = users.indexOf(id);
    if(i != -1) {
        users.splice(i, 1);
    }
}

io.on('connection', function(socket){
    console.log('a user connected');

    addUser(socket.id);
    socket.broadcast.emit('user_joined', users);
    socket.emit('user_joined', users);

    socket.on('disconnect', function(){
        removeUser(socket.id);
        socket.broadcast.emit('user_left', users);
        console.log('a user disconnected');
    });

    socket.on('add_marker', function(data){
        console.log('a user added a marker');
        socket.broadcast.emit('marker_added',data);
    });

    socket.on('delete_marker', function(data){
        console.log('a user added a marker');
        socket.broadcast.emit('marker_delete',data);
    });

    socket.on('add_room', function(){
        console.log('room added');
        var url = '/room/' + (rooms + 1)
        var nsp = io.of(url);
        nsp.on('connection', function(socket){
            console.log('someone connected');
            nsp.emit('hi', 'everyone!');
        });
               
        socket.broadcast.emit('room_added', url);

    })

    socket.on('delete_room', function(data){
        console.log('room deleted')
        socket.broadcast.emit('room_deleted', data);
    })
});

http.listen(port, function(){
    console.log('listening on *:3000');
});


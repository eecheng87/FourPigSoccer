let express = require('express');
let app = express();
let socket = require('socket.io');


let server = app.listen(8080);
let io = socket(server);
//handle http
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/game.html');
});
//add resources!
app.use('/css', express.static('css'));
app.use('/resources', express.static('resources'));
app.use('/js', express.static('js'));

//process web socket
io.on('connection', (socket) => {
    //tell each client some new event happen
    socket.on('position', (data) => {
        socket.broadcast.emit('position', data);
    });
});
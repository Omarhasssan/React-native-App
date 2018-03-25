const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(9460);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

let userId;
io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('join', (data) => {
    console.log(data.id, 'have a room');
    socket.join(data.id);
  });
  socket.on('sendRequest', (data) => {
    console.log('heree in sendRequest channel', data.userId);
    io.sockets.in(data.userId).emit('requests', data.request);
  });
});

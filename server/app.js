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
  console.log('connected');
  socket.on('disconnect', () => {
    console.log('dissssss');
  });
  // create room to send and recieve requests
  socket.on('roomByUserId', (data) => {
    socket.join(data.id);
  });
  socket.on('sendRequest', (data) => {
    io.sockets.in(data.userId).emit('requests', data.request);
  });

  // create room to join with another team
  // socket.on('roomByRoomId', (data) => {
  //   socket.join(data.id);
  // });
  // socket.on('roomChanged', (data) => {
  //   io.sockets.in(data.updatedRoom.id).emit('roomChanged', data.updatedRoom);
  // });
  socket.on('joinRoomsChannel', () => {
    socket.join('roomsChannel');
  });
  socket.on('updateRoom', (data) => {
    io.sockets.in('roomsChannel').emit('roomUpdated', data.updatedRoom);
  });
  socket.on('addRoom', (data) => {
    io.sockets.in('roomsChannel').emit('roomAdded', data.addedRoom);
  });
});
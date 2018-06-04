const express = require('express');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(9460);

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('disconnect', () => {
    console.log('dissssss');
  });

  socket.on('leaveRoom', (data) => {
    socket.leave(data.roomId, () => console.log('left the god damn room'));
  });
  // create room by useId to send and recieve requests
  socket.on('roomByUserId', (data) => {
    socket.join(data.id);
  });
  socket.on('roomByRoomId', (data) => {
    socket.join(data.id);
  });
  socket.on('roomByTeamId', (data) => {
    socket.join(data.id);
  });
  socket.on('setCurntRoom', (data) => {
    io.sockets.in(data.roomId).emit('getCurntRoom', data.roomId);
  });
  socket.on('sendRequest', (data) => {
    io.sockets.in(data.userId).emit('requests', data.request);
  });
  socket.on('removeRequest', (data) => {
    io.sockets.in(data.userId).emit('removeRequest', data.request);
  });
  socket.on('joinRoomsChannel', () => {
    console.log('joinRommsChannel');
    socket.join('roomsChannel');
  });
  socket.on('roomUpdated', (data) => {
    console.log('in roomuPDATED++++++++++');
    // this for all joined in roomsChannel
    io.sockets.in('roomsChannel').emit('updateRooms', data.updatedRoom);
    // this is   for target room
    io.sockets.in(data.updatedRoom.id).emit('updateRoom', data.updatedRoom);
  });
  socket.on('addRoom', (data) => {
    io.sockets.in('roomsChannel').emit('roomAdded', data.addedRoom);
  });

  socket.on('teamHasMatch', (data) => {
    console.log('in socket server');

    io.sockets
      .in(data.teamId)
      .emit('teamHasMatch', { teamId: data.teamId, updatedMatches: data.updatedMatches });
  });
});

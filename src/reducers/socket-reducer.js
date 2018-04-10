import io from 'socket.io-client/dist/socket.io';

let socket = null;
export default function (state = socket, action) {
  switch (action.type) {
    case 'CREATE_ROOM_BY_USER_ID': {
      console.log('CREATE_ROOM_BY_USER_ID');

      socket = io.connect('http://b2dd57c6.ngrok.io');
      socket.emit('roomByUserId', { id: action.id });
      return socket;
    }

    case 'JOIN_ROOMS_CHANNEL': {
      console.log('JOINED ROOMS CHANNEL');
      socket = socket.emit('joinRoomsChannel');
      return socket;
    }

    default: {
      return state;
    }
  }
}

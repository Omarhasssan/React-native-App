import io from 'socket.io-client/dist/socket.io';

let socket;
export default function (state = null, action) {
  switch (action.type) {
    case 'CREATE_ROOM': {
      socket = io.connect('http://7a3e72e9.ngrok.io');
      socket.emit('join', { id: action.id });
      return socket;
    }
    default:
      return state;
  }
}

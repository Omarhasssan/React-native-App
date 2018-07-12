import io from 'socket.io-client/dist/socket.io';

let socket = io.connect('http://99b2d461.ngrok.io');
export default function(state = socket, action) {
  switch (action.type) {
    case 'CREATE_ROOM_BY_USER_ID': {
      state.emit('roomByUserId', { id: action.id });
      return state;
    }
    case 'CREATE_ROOM_BY_TEAM_ID': {
      state.emit('roomByTeamId', { id: action.id });
      return state;
    }
    case 'CREATE_ROOM_BY_ROOM_ID': {
      state.emit('roomByRoomId', { id: action.id });
      return state;
    }
    case 'JOIN_ROOMS_CHANNEL': {
      state.emit('joinRoomsChannel');
      return state;
    }

    default: {
      return state;
    }
  }
}

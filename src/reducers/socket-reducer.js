import io from 'socket.io-client/dist/socket.io';

let socket = io.connect('http://bdbd1638.ngrok.io');
export default function(state = socket, action) {
  switch (action.type) {
    case 'CREATE_ROOM_BY_USER_ID': {
      console.log('CREATE_ROOM_BY_USER_ID');
      state.emit('roomByUserId', { id: action.id });
      return state;
    }
    case 'CREATE_ROOM_BY_TEAM_ID': {
      console.log('CREATE_ROOM_BY_TEAM_ID');
      state.emit('roomByTeamId', { id: action.id });
      return state;
    }
    case 'CREATE_ROOM_BY_ROOM_ID': {
      console.log('CREATE_ROOM_BY_ROOM_ID');
      state.emit('roomByRoomId', { id: action.id });
      return state;
    }
    case 'JOIN_ROOMS_CHANNEL': {
      console.log('JOINED ROOMS CHANNEL');
      state.emit('joinRoomsChannel');
      return state;
    }

    default: {
      return state;
    }
  }
}

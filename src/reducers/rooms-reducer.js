import io from 'socket.io-client/dist/socket.io';

function updateRoom(rooms, roomId, updatedRoom) {
  return rooms.map(room => (room.id === roomId ? updatedRoom : room));
}

function getRoomById(rooms, roomId) {
  return rooms.filter(room => room.id === roomId)[0];
}

export default function (state = { rooms: [], curntRoom: {} }, action) {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, action.room] };
    case 'ROOMS':
      return { ...state, rooms: action.rooms };

    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: updateRoom(state.rooms, action.room.id, action.room.updatedRoom),
        curntRoom: action.room.id == state.curntRoom.id ? action.room.updatedRoom : state.curntRoom,
      };
    case 'GET_ROOM':
      return { ...state, curntRoom: getRoomById(state.rooms, action.roomId) };
    default:
      return state;
  }
}

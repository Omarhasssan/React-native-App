function updateRoom(rooms, roomId, updatedRoom) {
  return rooms.map(room => (room.id === roomId ? updatedRoom : room));
}

function getRoomById(rooms, roomId) {
  return rooms.filter(room => room.id === roomId)[0];
}

export default function (state = { rooms: [], createdRoom: {}, joinedRoom: {} }, action) {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, action.room] };
    case 'ROOMS':
      return { ...state, rooms: action.rooms };

    case 'UPDATE_ROOMS':
      return {
        ...state,
        rooms: updateRoom(state.rooms, action.room.id, action.room.updatedRoom),
      };
    case 'UPDATE_JOINED_ROOM':
      return {
        ...state,
        joinedRoom:
          action.room.id == state.joinedRoom.id ? action.room.updatedRoom : state.joinedRoom,
      };
    case 'UPDATE_CREATED_ROOM':
      return {
        ...state,
        createdRoom:
          action.room.id == state.createdRoom.id ? action.room.updatedRoom : state.createdRoom,
      };
    case 'SET_CREATED_ROOM':
      return { ...state, createdRoom: action.room };
    case 'SET_JOINED_ROOM':
      return { ...state, joinedRoom: action.room };
    default:
      return state;
  }
}

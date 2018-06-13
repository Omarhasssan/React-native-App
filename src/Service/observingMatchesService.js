import firebase from '../config/firebase';

export const observingMatchesService = {
  addObservingMatch,
};
function addObservingMatch(observingRoom) {
  const obRoom = observingRoom;
  const obMatch = firebase
    .database()
    .ref('MatchesToObserve')
    .push();
  obRoom.id = obMatch.key;
  obMatch.set(observingRoom);
}

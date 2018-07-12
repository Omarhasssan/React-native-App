import firebase from '../config/firebase';

export const observingMatchesService = {
  addObservingMatch,
};
function addObservingMatch(observingMatch, observerId) {
  firebase
    .database()
    .ref(`MatchesToObserve/${observerId}`)
    .set(observingMatch);
}

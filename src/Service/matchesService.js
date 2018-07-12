import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');
import { teamsService, usersService } from '../Service';
export const matchesService = {
  getMatchById,
  addMatch,
};
function addMatch(match) {
  const matchRef = firebase
    .database()
    .ref('Matches')
    .push();
  return matchRef.set(match).then(() => Promise.resolve(matchRef.key));
}
function getMatchById(matchId, teamId, observerMood = false) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'Matches'}/${matchId}`)
      .once('value', async snapshot => {
        const match = snapshot.toJSON();
        const matchObj = {};
        matchObj.date = match.date;
        matchObj.location = match.location;
        const p1 = teamsService.getTeamById(
          match.awayTeam,
          'withoutTeamMatches'
        );
        const p2 = teamsService.getTeamById(
          match.homeTeam,
          'withoutTeamMatches'
        );
        await Promise.all([p1, p2]).then(async teams => {
          const awayTeam = teams[0];
          const homeTeam = teams[1];
          if (observerMood) {
            matchObj.firstTeam = homeTeam;
            matchObj.secondTeam = awayTeam;
          } else {
            if (teamId == match.homeTeam) {
              matchObj.oponnentTeam = awayTeam;
            } else matchObj.oponnentTeam = homeTeam;
            matchObj.observer = await usersService.getUserById(match.observer);
          }
          return resolve(matchObj);
        });
      });
  });
}

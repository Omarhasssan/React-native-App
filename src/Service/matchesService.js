import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');
import { teamsService, usersService } from '../Service';
export const matchesService = {
  getMatchById,
};
function getMatchById(matchId, teamId) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'Matches'}/${matchId}`)
      .once('value', async snapshot => {
        const match = snapshot.toJSON();
        const matchObj = {};
        matchObj.date = match.date;
        matchObj.location = match.location;
        if (teamId == match.homeTeam) {
          matchObj.opponentTeam = await teamsService.getTeamById(
            match.awayTeam,
            'withoutTeamMatches',
          );
        } else
          matchObj.opponentTeam = await teamsService.getTeamById(
            match.homeTeam,
            'withoutTeamMatches',
          );

        matchObj.observer = await usersService.getUserById(match.observer);
        return resolve(matchObj);
      });
  });
}

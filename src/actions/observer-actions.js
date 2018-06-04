export const submitMatchObservation = matchDetails => (dispatch) => {
  fetch('https://us-central1-squad-builder.cloudfunctions.net/req/submitMatchObservation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchDetails),
  }).then((res) => {
    console.log('res');
  });
};

import { connect } from 'react-redux';

import TeamDetails from './TeamDetails';
import withModel from '../hocs/withModel';
import { hideTeamDetailsModel } from '../actions';

const mapDispatchToProps = dispatch => ({
  closeModel() {
    dispatch(hideTeamDetailsModel());
  },
});

export default connect(null, mapDispatchToProps)(withModel({ flex: 1, justifyContent: 'center' }, ({ closeModel }) => closeModel())(TeamDetails));

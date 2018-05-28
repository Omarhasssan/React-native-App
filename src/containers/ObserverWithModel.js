import { connect } from 'react-redux';

import AddObserver from './AddObserver';
import withModel from '../hocs/withModel';
import { hideObserverModel } from '../actions';

const mapDispatchToProps = dispatch => ({
  closeModel() {
    dispatch(hideObserverModel());
  },
});

export default connect(null, mapDispatchToProps)(withModel({ justifyContent: 'flex-start', width: `${90}%` }, ({ closeModel }) => closeModel())(AddObserver));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import CreateRoom from './CreateRoom';
import Rooms from '../components/Rooms';
import withCheckUserHaveRoom from '../hocs/withCheckUserHaveRoom';
import Spinner from '../components/Spinner';
import { getRooms } from '../actions';

const mapStateToProps = ({ roomsReducer, auth }) => ({
  rooms: roomsReducer.rooms,
  user: auth.user,
});
const Tabs = TabNavigator({
  CreateRoom: { screen: connect(mapStateToProps)(withCheckUserHaveRoom(CreateRoom)) },
  JoinRoom: { screen: Rooms },
});

class TabNav extends Component {
  componentWillMount() {
    const { getRooms } = this.props;
    this.setState({ loading: true });
    getRooms();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.rooms) this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state;
    if (loading) return <Spinner />;
    return <Tabs {...this.props} />;
  }
}
const mapDispatchToProps = dispatch => ({
  getRooms() {
    dispatch(getRooms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNav);

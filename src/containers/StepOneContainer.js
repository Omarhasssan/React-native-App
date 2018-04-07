import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';
import StepOneComp from '../components/StepOneComp';
import { getRooms } from '../actions';

class StepOneContainer extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StepOneComp
          onJoinTeam={() => navigation.navigate('JoinTeam')}
          onCreateTeam={() => navigation.navigate('CreateTeamStepOne')}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getRooms() {
    dispatch(getRooms());
  },
});
const mapStateToProps = ({ auth, roomsReducer }) => ({
  user: auth.user,
  roomsReducer,
});
export default connect(mapStateToProps, mapDispatchToProps)(withCheckUserHaveTeam(StepOneContainer));

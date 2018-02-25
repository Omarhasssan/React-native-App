import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';
import StepOneComp from '../components/StepOneComp';

class StepOneContainer extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <StepOneComp
        onJoinTeam={() => navigation.navigate('JoinTeam')}
        onCreateTeam={() => navigation.navigate('CreateTeamStepOne')}
      />
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  auth,
});
export default connect(mapStateToProps)(withCheckUserHaveTeam(StepOneContainer));

import React, { Component } from 'react';
import TeamName from '../components/TeamName';
import { addTeam, setTeamName } from '../actions';
import { connect } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';

class TeamNameContainer extends Component {
  state = {
    teamName: '',
  };

  static navigationOptions({ navigation }) {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.state.params.setTeamName(navigation.state.params.teamName);
          }}
        >
          <Text>Create</Text>
        </TouchableOpacity>
      ),
    };
  }

  render() {
    const { setTeamName, navigation } = this.props;
    const { teamName } = this.state;
    return (
      <TeamName
        onChange={teamName => {
          this.setState({ teamName }, () => {
            navigation.setParams({
              ...navigation.state.params,
              setTeamName: setTeamName,
              teamName: teamName,
            });
          });
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTeamName(teamName) {
    dispatch(setTeamName(teamName));
  },
});

export default connect(null, mapDispatchToProps)(TeamNameContainer);

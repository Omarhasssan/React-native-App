import React, { Component } from 'react';
import TeamName from '../components/TeamName';
import { addTeam } from '../actions';
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
            navigation.state.params.prps.onSaveTeam(
              navigation.state.params.socket || '',
              navigation.state.params.prps.user,
              navigation.state.params.teamName,
              navigation.state.params.playersId,
            );
          }}
        >
          <Text>Create</Text>
        </TouchableOpacity>
      ),
    };
  }

  render() {
    const playersId = this.props.navigation.state.params.playersId;
    const { user, onSaveTeam, navigation, socket, sendTeamRequest } = this.props;
    const { teamName } = this.state;
    return (
      <TeamName
        onChange={teamName => {
          this.setState({ teamName }, () => {
            navigation.setParams({
              ...navigation.state.params,
              prps: { user, onSaveTeam, sendTeamRequest },
              teamName: teamName,
              socket: socket,
            });
          });
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth, team, socket }) => ({
  user: auth.user,
  socket: socket,
});
const mapDispatchToProps = dispatch => ({
  onSaveTeam(socket, user, teamName, playersId) {
    dispatch(addTeam(socket, user, teamName, playersId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamNameContainer);

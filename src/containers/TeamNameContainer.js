import React, { Component } from 'react';
import TeamName from '../components/TeamName';
import { addTeam } from '../actions';
import { connect } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';

// ON NEXT GO TO NEXT SCREEN
// AND SAVE DATA TO USER

class TeamNameContainer extends Component {
  state = {
    teamName: '',
  };
  static navigationOptions({ navigation }) {
    return {
      headerRight: (
        <TouchableOpacity
          disabled={!navigation.state.params.team.name}
          onPress={() => {
            navigation.state.params.prps.onSaveTeam(
              navigation.state.params.prps.user,
              navigation.state.params.team,
            );
            navigation.navigate('Profile');
          }}
        >
          <Text
            style={{
              color: `${!navigation.state.params.team.name ? 'gray' : 'blue'}`,
              opacity: `${!navigation.state.params.team.name ? 0.7 : 1}`,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      ),
    };
  }
  render() {
    const team = this.props.navigation.state.params.team;
    const { user, onSaveTeam } = this.props;
    return (
      <TeamName
        onChange={teamName => {
          this.setState({ teamName }, () => {
            this.props.navigation.setParams({
              prps: { user, onSaveTeam },
              team: { ...team, name: this.state.teamName },
            });
          });
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = dispatch => ({
  onSaveTeam(user, team) {
    dispatch(addTeam(user, team));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamNameContainer);

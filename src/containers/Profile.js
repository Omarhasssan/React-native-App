import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

// ON NEXT GO TO NEXT SCREEN
// AND SAVE DATA TO USER

class Profile extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>welcome {this.props.user.name}</Text>;
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps)(Profile);

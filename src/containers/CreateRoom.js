import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import TxtInput from '../components/TxtInput';
import { createRoom } from '../actions';
class CreateRoom extends Component {
  state = {
    Name: '',
  };
  render() {
    const { Name } = this.state;
    const { onCreate, user } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TxtInput
          style={{
            backgroundColor: 'transparent',
            borderBottomColor: '#c4c4c4',
            borderBottomWidth: 1,
          }}
          onChangeText={Name => this.setState({ Name })}
          placeholder="Room Name"
        />

        <Button title="Create Room" onPress={() => onCreate(user, Name)} />
      </View>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = dispatch => ({
  onCreate(user, Name) {
    dispatch(createRoom(user, Name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);

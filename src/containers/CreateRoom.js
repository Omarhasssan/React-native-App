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
    const { onCreate, user, socket } = this.props;
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

        <Button title="Create Room" onPress={() => onCreate(user, Name, socket)} />
      </View>
    );
  }
}
const mapStateToProps = ({ auth, socket }) => ({
  user: auth.user,
  socket: socket,
});
const mapDispatchToProps = dispatch => ({
  onCreate(user, Name, socket) {
    dispatch(createRoom(user, Name, socket));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);

import React, { Component } from 'react';
import firebase from '../config/firebase'; // 4.9.0
import withLoading from '../hocs/withLoading';
import { Alert, TouchableOpacity, Text, Button, View, StyleSheet, TextInput } from 'react-native';
class FormRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.form.name,
      password: this.props.form.password,
      mobilenumber: this.props.form.mobilenumber,
    };
  }

  componentWillMount() {
    if (this.props.auth.msg) {
      Alert.alert(`${this.props.auth.msg}`);
    }
  }
  isDisabled = () => {
    const { name, mobilenumber, password } = this.state;
    return !name.length || !password.length || !mobilenumber;
  };
  Register = () => {
    const { onRegister } = this.props;
    const { name, password, mobilenumber } = this.state;
    onRegister({ name, mobilenumber, password });
  };

  render() {
    let title = this.props.navigation.state.routeName;
    const { navigate } = this.props.navigation;
    const { user } = this.props.auth;

    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={[
              styles.textinput,
              {
                borderBottomWidth: 0.5,
                borderColor: '#EBEBEB',
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              },
            ]}
            onChangeText={name => {
              this.setState({ name }, () => this.props.onUpdate(this.state));
            }}
            value={this.state.name}
            placeholder={'username'}
          />
          <TextInput
            style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
            onChangeText={password => {
              this.setState({ password }, () => this.props.onUpdate(this.state));
            }}
            value={this.state.password}
            placeholder={'password'}
            secureTextEntry={true}
          />
          {title == 'SignUp' ? (
            <TextInput
              style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
              onChangeText={mobilenumber => {
                this.setState({ mobilenumber }, () => this.props.onUpdate(this.state));
              }}
              value={this.state.mobilenumber}
              placeholder={'mobilenumber'}
            />
          ) : null}
          <TouchableOpacity style={styles.btn} onPress={this.Register}>
            <Text style={{ color: 'gray' }}>{title}</Text>
          </TouchableOpacity>
        </View>
        {title == 'SignUp' ? (
          <Button title={'Already have an account'} onPress={() => navigate('Hello')} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50 + '%',
    marginBottom: 50 + '%',
    height: 'auto',
    width: 90 + '%',
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: 100 + '%',
    borderRadius: 3,
    alignItems: 'center',
  },

  textinput: {
    width: 100 + '%',
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});
export default withLoading(FormRender, ({ auth }) => auth.isFetching);

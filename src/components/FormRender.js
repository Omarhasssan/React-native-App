import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
class FormRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.form.name,
      password: this.props.form.password,
      mobilenumber: this.props.form.mobilenumber,
      clicked: false,
    };
  }

  componentWillMount() {
    console.log('========mount========');
    console.log(this.props);
    console.log('========mount========');
  }
  componentWillReceiveProps(nextProps) {
    console.log('========rc========');
    console.log(nextProps);
    console.log('========rc========');
    const activeScreen = nextProps.nav.routes[nextProps.nav.routes.length - 1].key;
    const ComponentScreen = nextProps.navigation.state.key;
    if (this.state.clicked && ComponentScreen == activeScreen) {
      if (nextProps.auth.msg) {
        Alert.alert(`${nextProps.auth.msg}`);
        this.props.onClearError();
      }
      this.setState({ clicked: false });
    }
  }
  componentWillUnmount() {
    console.log('unmountttt');
    this.props.onClearError();
    this.props.onClearForm();
  }

  isDisabled = () => {
    const { name, mobilenumber, password } = this.state;
    return !name.length || !password.length || !mobilenumber;
  };
  Register = () => {
    const { onRegister } = this.props;
    const { name, password, mobilenumber } = this.state;
    onRegister({ name, mobilenumber, password });
    this.setState({ clicked: true });
  };
  Login = () => {
    console.log('login=>');
    const { onLogin } = this.props;
    const { name, password } = this.state;
    onLogin({ name, password });
    this.setState({ clicked: true });
  };

  render() {
    let title = this.props.navigation.state.routeName;
    const { navigate } = this.props.navigation;
    const { user } = this.props.auth;
    const { clicked } = this.state;

    if (this.props.auth.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

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
          <TouchableOpacity
            style={styles.btn}
            onPress={title == 'SignUp' ? this.Register : this.Login}
          >
            <Text style={{ color: 'gray' }}>{title}</Text>
          </TouchableOpacity>
        </View>
        {title == 'SignUp' ? (
          <Button
            title={'Already have an account'}
            onPress={() => {
              navigate('Login');
              this.props.onClearError();
              this.props.onClearForm();
            }}
          />
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
export default FormRender;

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
import Spinner from './Spinner';
class FormRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      mobilenumber: '',
      btnClicked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const activeScreen = nextProps.nav.routes[nextProps.nav.routes.length - 1].key;
    const ComponentScreen = nextProps.navigation.state.key;
    if (this.state.btnClicked && ComponentScreen == activeScreen) {
      if (nextProps.auth.msg) {
        Alert.alert(`${nextProps.auth.msg}`);
        this.props.onClearError();
      }
      this.setState({ btnClicked: false });
    }
  }
  clearForm = () => {
    this.setState({ name: '', mobilenumber: '', password: '' });
  };
  componentWillUnmount() {
    this.props.onClearError();
    this.clearForm();
  }

  isDisabled = () => {
    const { name, mobilenumber, password } = this.state;
    return !name.length || !password.length || !mobilenumber;
  };

  render() {
    let title = this.props.navigation.state.routeName;
    const { navigation, onRegister, onLogin, onClearError } = this.props;
    const { btnClicked, name, password, mobilenumber } = this.state;

    if (this.props.auth.isFetching) return <Spinner />;

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
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder={'username'}
          />
          <TextInput
            style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder={'password'}
            secureTextEntry={true}
          />
          {title == 'SignUp' ? (
            <TextInput
              style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
              onChangeText={mobilenumber => this.setState({ mobilenumber })}
              value={this.state.mobilenumber}
              placeholder={'mobilenumber'}
            />
          ) : null}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              title == 'SignUp'
                ? onRegister({ name, password, mobilenumber })
                : onLogin({ name, password });
              this.setState({ btnClicked: true });
            }}
          >
            <Text style={{ color: 'gray' }}>{title}</Text>
          </TouchableOpacity>
        </View>
        {title == 'SignUp' ? (
          <Button
            title={'Already have an account'}
            onPress={() => {
              navigation.navigate('Login');
              onClearError();
              this.clearForm();
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

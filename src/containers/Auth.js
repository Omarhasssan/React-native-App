import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Register, clearError, Login } from '../actions';
import FormRender from '../components/FormRender';
import Spinner from '../components/Spinner';
import { Alert } from 'react-native';

const intialState = {
  name: '',
  password: '',
  mobilenumber: '',
  btnClicked: false,
};
class Auth extends Component {
  state = {
    name: '',
    password: '',
    mobilenumber: '',
    btnClicked: false,
  };
  componentWillReceiveProps(nextProps) {
    const activeScreen = nextProps.nav.routes[nextProps.nav.routes.length - 1].key;
    const curntComponent = nextProps.navigation.state.key;
    if (curntComponent == activeScreen) {
      if (this.state.btnClicked && nextProps.auth.msg) {
        Alert.alert(`${nextProps.auth.msg}`);
        nextProps.onClearError();
        this.setState({ btnClicked: false });
      }
      if (nextProps.auth.user) {
        this.props.navigation.navigate('Setup');
      }
    }
  }
  render() {
    if (this.props.auth.isFetching) return <Spinner />;

    return (
      <FormRender
        {...this.state}
        onChangeName={name => this.setState({ name })}
        onChangePassword={password => this.setState({ password })}
        onChangeMobileNumber={mobilenumber => this.setState({ mobilenumber })}
        onChangeBtn={btnClicked => this.setState({ btnClicked })}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ auth, nav }) => ({
  auth,
  nav,
});

const mapDispatchToProps = dispatch => ({
  onRegister(user) {
    dispatch(Register(user));
  },

  onLogin(user) {
    dispatch(Login(user));
  },
  onClearError() {
    dispatch(clearError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

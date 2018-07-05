import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Register, clearError, Login } from '../actions';
import FormRender from '../components/FormRender';
import Spinner from '../components/Spinner';
import { Alert } from 'react-native';
import CreateOrJoinTeam from './CreateOrJoinTeam';
import { ImagePicker } from 'expo';
import OptionsWithModel from '../components/Options';
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
    imgUri: '',
    showModel: true,
    btnClicked: false,
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ imgUri: result.uri, showModel: false });
    }
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
    }
  }
  render() {
    const { showModel } = this.state;
    const activeScreen = this.props.nav.routes[this.props.nav.routes.length - 1].key;
    const curntComponent = this.props.navigation.state.key;
    if (this.props.auth.isFetching) return <Spinner />;
    if (this.props.auth.user && curntComponent == activeScreen) {
      this.props.navigation.navigate('Profile');
    }

    return (
      <View>
        {showModel && (
          <OptionsWithModel
            options={[
              {
                option: 'ChangePhoto',
                onClick: () => this._pickImage(),
              },
              {
                option: 'RemovePhoto',
                onClick: () => this.setState({ imgUri: '', showModel: false }),
              },
            ]}
            onCancel={() => this.setState({ showModel: false })}
          />
        )}
        <FormRender
          {...this.state}
          onShowModel={() => this.setState({ showModel: true })}
          onChangeName={name => this.setState({ name })}
          onChangePassword={password => this.setState({ password })}
          onChangeMobileNumber={mobilenumber => this.setState({ mobilenumber })}
          onChangeBtn={btnClicked => this.setState({ btnClicked })}
          {...this.props}
        />
      </View>
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

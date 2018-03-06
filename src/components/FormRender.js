import React from 'react';
import { TouchableOpacity, Image, Text, Button, View, StyleSheet, TextInput } from 'react-native';
import ImagePicker from './ImagePicker';

const FormRender = (props) => {
  const {
    name, password, mobilenumber, imgUri, btnClicked, onShowModel,
  } = props;
  const title = props.navigation.state.routeName;
  return (
    <View>
      <View style={styles.container}>
        {title == 'SignUp' ? (
          <View
            style={{
              width: `${100}%`,
              height: 'auto',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <ImagePicker
              onShowModel={() => {
                onShowModel();
              }}
              imgUri={imgUri}
            />
          </View>
        ) : null}
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
          onChangeText={props.onChangeName}
          value={name}
          placeholder="username"
        />
        <TextInput
          style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
          onChangeText={props.onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry
        />
        {title == 'SignUp' ? (
          <TextInput
            style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
            onChangeText={props.onChangeMobileNumber}
            value={mobilenumber}
            placeholder="mobilenumber"
          />
        ) : null}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            title == 'SignUp'
              ? props.onRegister({
                  name,
                  password,
                  mobilenumber,
                  imgUri,
                })
              : props.onLogin({ name, password });
            props.onChangeBtn(true);
          }}
        >
          <Text style={{ color: 'gray' }}>{title}</Text>
        </TouchableOpacity>
      </View>
      {title == 'SignUp' ? (
        <Button
          title="Already have an account"
          onPress={() => {
            props.navigation.navigate('Login');
            props.onClearError();
          }}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: `${10}%`,
    marginBottom: `${50}%`,
    height: 'auto',
    width: `${90}%`,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: `${100}%`,
    borderRadius: 3,
    alignItems: 'center',
  },

  textinput: {
    width: `${100}%`,
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});

export default FormRender;

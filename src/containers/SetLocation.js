import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class SetLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationInput: '',
      locationCoordinates: {
        longitude: 31.340002,
        latitude: 30.044281,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        address: '',
      },
    };

    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  updateLocationCoordinates(results) {
    const info = results[0].geometry.location;

    this.setState({
      locationCoordinates: {
        latitude: info.lat,
        longitude: info.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        address: results[0].formatted_address,
      },
    });
  }

  handleLocationInput(textInput) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${textInput
        .split(' ')
        .join('')}&key=` + 'AIzaSyAvOysLUFQ9swkfFTSh-8_YnNfWskPeny4'
    )
      .then(response => response.json())
      .then(res => {
        this.updateLocationCoordinates(res.results);
      })
      .catch(error => console.log('Failjax: ', error));
  }

  handleLocationChange(response) {
    this.setState({
      locationCoordiante: response,
    });
  }
  componentWillUnmount() {
    this.props.navigation.state.params.SetLocation(
      this.state.locationCoordinates
    );
  }

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={this.state.locationCoordinates}
          onRegionChange={this.handleLocationChange}
          zoomEnabled
          scrollEnabled
        >
          <MapView.Marker coordinate={this.state.locationCoordinates} />
        </MapView>
        <View style={styles.allNonMapThings}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder=" Where to?"
              style={styles.input}
              onChangeText={this.handleLocationInput}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overallViewContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    elevation: 1,
    width: '99%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  allNonMapThings: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '6%',
    top: 40,
    borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
  },
  button: {
    elevation: 1,
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#ff6600',
    borderRadius: 10,
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

export default (SetRoomLocation = ({ roomType, setLocation, location }) => (
  <View style={styles.container}>
    <View style={styles.locationFirstContainer}>
      {location &&
        location.address && (
          <View style={styles.address}>
            <Text style={{ fontSize: 6 }}>{location && location.address}</Text>
          </View>
        )}
      <View>
        <Btn
          txtStyle={{
            fontStyle: 'bold',
            fontSize: 6,
            color: 'white',
          }}
          containerStyle={{
            padding: 3,
            width: 'auto',
            height: 13,
            backgroundColor: '#1da1f2',
          }}
          txt={
            (roomType == 'joinedRoom' && 'Click to Open in Maps') ||
            (location && location.address && 'Change Location') ||
            'Set Location'
          }
          onPress={() =>
            (roomType == 'createdRoom' &&
              navigate('SetLocation', {
                SetLocation: locationCoordinates =>
                  setLocation(locationCoordinates),
              })) ||
            openMap({
              latitude: location && location.latitude,
              longitude: location && location.longitude,
            })
          }
        />
      </View>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontStyle: 'italic', fontSize: 8 }}>
        *Set Location for the match , Both Team players will be notifyed by this
        location*
      </Text>
    </View>
  </View>
));
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: `${100}%`,
  },
  locationFirstContainer: {
    width: `${50}%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    alignItems: 'center',
    width: `${60}%`,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

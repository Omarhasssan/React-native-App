import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { showObserverModel, setRoomLocation, setRoomDate } from '../actions';
import Observer from './Observer';
import SetDateTime from './SetDateTime';
import SetRoomLocation from './SetRoomLocation';
var _ = require('lodash');

const RoomSettings = ({
  observerLoading,
  setRoomDate,
  setRoomLocation,
  showObserverModel,
  roomSettings,
  roomType,
}) => (
  <View
    style={{
      //backgroundColor: 'red',
      height: `${55}%`,
      alignItems: 'center',
    }}
  >
    <View style={styles.settingsContainer}>
      <Observer
        onAdd={() => showObserverModel()}
        isObserverLoading={observerLoading}
        observer={
          _.has(roomSettings, 'observer') &&
          Object.keys(roomSettings.observer).length > 0
            ? roomSettings.observer
            : null
        }
        roomOwner={roomType == 'createdRoom'}
      />
      <SetDateTime
        date={_.has(roomSettings, 'date') ? roomSettings.date : ''}
        setDate={date => setRoomDate(room, date, socket)}
        isRoomOwner={roomType == 'createdRoom'}
      />
      <SetRoomLocation
        location={
          _.has(roomSettings, 'location') ? roomSettings.location : null
        }
        setLocation={locationCoordinates =>
          setRoomLocation(room, locationCoordinates, socket)
        }
        roomType={roomType}
      />
    </View>
  </View>
);
const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: 'column',
    width: `${70}%`,
    flex: 1,
    //backgroundColor: 'green',
    justifyContent: 'space-around',
  },
});
const mapStateToProps = ({ observerLoading }) => ({
  observerLoading,
});
const mapDispatchToProps = dispatch => ({
  showObserverModel() {
    dispatch(showObserverModel());
  },

  setRoomDate(room, date, socket) {
    dispatch(setRoomDate(room, date, socket));
  },
  setRoomLocation(room, location, socket) {
    dispatch(setRoomLocation(room, location, socket));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomSettings);

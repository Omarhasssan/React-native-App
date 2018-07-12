import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import {
  leaveRoom,
  showObserverModel,
  showTeamDetailsModel,
  setRoomLocation,
  setRoomDate,
  setOwnerReady,
  setGuestReady,
  setRoomMatch,
} from '../actions';
import Observer from './Observer';
import SetDateTime from './SetDateTime';
import openMap from 'react-native-open-maps';
import TeamDetailsWithModel from './TeamDetailsWithModel';
import Random from './Random';
var _ = require('lodash');
class Room extends Component {
  state = {
    date: '',
    roomType: '',
    room: {},
    teamRecords: {},
  };
  componentDidMount() {
    const { navigation } = this.props;
    const { room } = navigation ? navigation.state.params : this.props;
    // if roomID comes from props then its roomOwner , if navigation then joinedRoom

    if (this.props.room) {
      this.setState({ roomType: 'createdRoom' });
      this.setState({ room: room });
    }
    // comes from navigation
    else {
      this.setState({ roomType: 'joinedRoom' });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { roomType } = this.state;
    const { roomsReducer, socket, joinRoom } = nextProps;

    if (roomType == 'createdRoom') {
      this.setState({ room: roomsReducer.createdRoom });
    } else if (roomType == 'joinedRoom') {
      this.setState({ room: roomsReducer.joinedRoom });
    }
  }
  componentWillUnmount() {
    const { leaveRoom, socket } = this.props;
    const { room, roomType } = this.state;
    if (roomType == 'joinedRoom') leaveRoom(room, socket);
  }
  isAllRight() {
    const { room } = this.state;
    const { OwnerReady, GuestReady, date, observer, location } =
      room.settings || {};
    const { joinedTeam } = room || {};

    return (
      OwnerReady &&
      GuestReady &&
      joinedTeam &&
      (observer &&
        Object.keys(observer).length &&
        observer.status == 'ACCEPTED') &&
      location &&
      date &&
      date.length
    );
  }
  render() {
    const { date, room, roomType, teamRecords } = this.state;
    const {
      showObserverModel,
      showTeamDetailsModel,
      showTeamRecords,
      socket,
      setRoomDate,
      setRoomLocation,
      roomsReducer,
      stackNavigation,
      setOwnerReady,
      setGuestReady,
      setRoomMatch,
      observerLoading,
    } = this.props;
    let navigate;
    if (roomType == 'createdRoom') {
      navigate = stackNavigation.navigate;
    }
    const location =
      room.settings && _.has(room.settings, 'location')
        ? room.settings.location
        : null;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.teamsContainer}>
          <Random
            team={room.teamOwner}
            teamType={roomType == 'createdRoom' ? 'ownerTeam' : 'opponentTeam'}
            showTeamDetails={() => {
              showTeamDetailsModel(room.teamOwner.records);
            }}
            setReady={val => setOwnerReady(room, val, socket)}
            teamReady={Object.keys(room).length && room.settings.OwnerReady}
          />
          {(room.joinedTeam && (
            <Random
              team={room.joinedTeam}
              teamType={
                roomType == 'createdRoom' ? 'opponentTeam' : 'ownerTeam'
              }
              showTeamDetails={() => {
                showTeamDetailsModel(room.joinedTeam.records);
              }}
              setReady={val => setGuestReady(room, val, socket)}
              teamReady={Object.keys(room).length && room.settings.GuestReady}
            />
          )) || (
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 8,
                  fontStyle: 'italic',
                }}
              >
                *WAIT FOR OPONNET TO JOIN YOUR ROOM*
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: '#edf1f7',
            flex: 1,
            //backgroundColor: 'yellow',
            alignItems: 'center',
          }}
        >
          <View style={styles.settingsContainer}>
            <Observer
              onAdd={() => showObserverModel()}
              isObserverLoading={observerLoading}
              observer={
                _.has(room, 'settings') &&
                _.has(room.settings, 'observer') &&
                Object.keys(room.settings.observer).length > 0
                  ? room.settings.observer
                  : null
              }
              roomOwner={roomType == 'createdRoom'}
            />
            <SetDateTime
              date={
                _.has(room, 'settings') && _.has(room.settings, 'date')
                  ? room.settings.date
                  : ''
              }
              setDate={date => setRoomDate(room, date, socket)}
              isRoomOwner={roomType == 'createdRoom'}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: `${50}%`,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 8, fontStyle: 'bold' }}>
                  Location:
                </Text>
              </View>

              <View
                style={{
                  width: `${50}%`,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {location &&
                  location.address && (
                    <View
                      style={{
                        alignItems: 'center',
                        width: `${100}%`,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 6 }}>
                        {location && location.address}
                      </Text>
                    </View>
                  )}
                <View>
                  {(roomType == 'createdRoom' && (
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
                      txt={`${
                        location && location.address
                          ? 'Change Location'
                          : 'Set Location'
                      }`}
                      onPress={() =>
                        navigate('SetLocation', {
                          SetLocation: locationCoordinates =>
                            setRoomLocation(room, locationCoordinates, socket),
                        })
                      }
                    />
                  )) || (
                    <Btn
                      txtStyle={{
                        fontStyle: 'bold',
                        fontSize: 6,
                        color: 'white',
                      }}
                      containerStyle={{
                        padding: 3,
                        height: 13,
                        backgroundColor: '#1da1f2',
                      }}
                      txt={'Click To Open Maps'}
                      onPress={() =>
                        openMap({
                          latitude: location && location.latitude,
                          longitude: location && location.longitude,
                        })
                      }
                    />
                  )}
                </View>
              </View>
            </View>
            <Btn
              txtStyle={[
                styles.normalBtnStyle,
                !this.isAllRight() && styles.disabledBtn,
              ]}
              disabled={!this.isAllRight()}
              containerStyle={{
                width: `${60}%`,
                alignItems: 'center',
                backgroundColor: '#1da1f2',
              }}
              txt={'Set Match !'}
              onPress={() => setRoomMatch(room, socket)}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: 5,
    flexDirection: 'column',
    width: `${70}%`,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamsContainer: {
    alignSelf: 'center',
    width: `${80}%`,
    //height: `${40}%`,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //backgroundColor: 'green',
  },
  normalBtnStyle: {
    fontStyle: 'bold',
    fontSize: 15,
    color: 'white',
  },
  disabledBtn: {
    color: 'white',
    opacity: '0.5',
  },
});
const mapStateToProps = ({
  socket,
  roomsReducer,
  teamsReducer,
  model,
  observerLoading,
}) => ({
  team: teamsReducer.curntTeam,
  socket,
  roomsReducer,
  showTeamRecords: model.showTeamRecords,
  observerLoading,
});
const mapDispatchToProps = dispatch => ({
  showObserverModel() {
    dispatch(showObserverModel());
  },
  showTeamDetailsModel(teamRecords) {
    dispatch(showTeamDetailsModel(teamRecords));
  },
  setRoomDate(room, date, socket) {
    dispatch(setRoomDate(room, date, socket));
  },
  setRoomLocation(room, location, socket) {
    dispatch(setRoomLocation(room, location, socket));
  },
  leaveRoom(room, socket) {
    dispatch(leaveRoom(room, socket));
  },
  setOwnerReady(room, val, socket) {
    dispatch(setOwnerReady(room, val, socket));
  },
  setGuestReady(room, val, socket) {
    dispatch(setGuestReady(room, val, socket));
  },
  setRoomMatch(room, socket) {
    dispatch(setRoomMatch(room, socket));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);

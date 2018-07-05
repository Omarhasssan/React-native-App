import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  leaveRoom,
  showObserverModel,
  showTeamDetailsModel,
  getRoom,
  joinRoom,
  setJoinedRoom,
  setRoomLocation,
  setRoomDate,
  setOpenedTeamDetails,
  setOwnerReady,
  setGuestReady,
  setRoomMatch,
} from '../actions';
import Observer from '../components/Observer';
import SetDateTime from './SetDateTime';
import openMap from 'react-native-open-maps';
import TeamInfo from '../components/Info';
import TeamDetailsWithModel from './TeamDetailsWithModel';
import Ready from './CheckBox';
import TopShadow from '../components/TopShadow';
var _ = require('lodash');
class Room extends Component {
  state = {
    date: '',

    type: '',
    room: {},
  };
  componentDidMount() {
    const { navigation } = this.props;
    const { room } = navigation ? navigation.state.params : this.props;
    // if roomID comes from props then its roomOwner , if navigation then joinedRoom

    if (this.props.room) {
      this.setState({ type: 'createdRoom' });
      this.setState({ room: room });
    }
    // comes from navigation
    else {
      this.setState({ type: 'joinedRoom' });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { type } = this.state;
    const { roomsReducer, socket, joinRoom } = nextProps;

    if (type == 'createdRoom') {
      this.setState({ room: roomsReducer.createdRoom });
    } else if (type == 'joinedRoom') {
      this.setState({ room: roomsReducer.joinedRoom });
    }
  }
  componentWillUnmount() {
    const { leaveRoom, socket } = this.props;
    const { room, type } = this.state;
    if (type == 'joinedRoom') leaveRoom(room, socket);
  }
  render() {
    const { date, room, type, OwnerReady, GuestReady } = this.state;
    const {
      style,
      showObserverModel,
      socket,
      setRoomDate,
      setRoomLocation,
      roomsReducer,
      stackNavigation,
      setOpenedTeamDetails,
      showTeamDetailsModel,
      showTeamDetails,
      setOwnerReady,
      setGuestReady,
      setRoomMatch,
    } = this.props;

    let navigate;
    if (type == 'createdRoom') navigate = stackNavigation.navigate;
    const location =
      room.settings && _.has(room.settings, 'location') ? room.settings.location : null;
    return (
      <View style={{ flex: 1 }}>
        {/* <Teams roomOwner={room.teamOwner} joinedTeam={room.joinedTeam} /> */}
        {showTeamDetails && <TeamDetailsWithModel />}

        <View
          style={{
            alignSelf: 'center',
            width: `${70}%`,
            flexDirection: 'row',
            justifyContent: 'center',
            //backgroundColor: 'green',
            paddingTop: 20,
          }}
        >
          <View
            style={{
              //backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TeamInfo
              userImgStyle={{ width: 40, height: 40 }}
              name={room.teamOwner && room.teamOwner.name}
            />
            <View style={{ marginBottom: 15, alignItems: 'center' }}>
              {type != 'createdRoom' && (
                <Btn
                  txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                  containerStyle={{
                    padding: 3,
                    width: 'auto',

                    backgroundColor: '#1da1f2',
                    position: 'absolute',
                  }}
                  txt={'Team Details'}
                  onPress={() => {
                    setOpenedTeamDetails(room.teamOwner ? room.teamOwner.records : null);
                    showTeamDetailsModel();
                  }}
                />
              )}
            </View>

            {type == 'createdRoom' && (
              <Ready txt={'Ready'} setCheck={val => setOwnerReady(room, val, socket)} />
            )}
            {type != 'createdRoom' &&
              room.settings &&
              room.settings.OwnerReady == true && <Text style={{ fontSize: 30 }}>READY</Text>}
          </View>

          {/* <TopShadow containerStyle={{ height: `${100}%`, width: `${100}%` }} /> */}
          <View
            style={{
              // backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TeamInfo
              userImgStyle={{ width: 40, height: 40 }}
              name={room.joinedTeam && room.joinedTeam.name}
            />
            <View style={{ marginBottom: 15, alignItems: 'center' }}>
              {type != 'joinedRoom' && (
                <Btn
                  txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                  containerStyle={{
                    padding: 3,
                    width: 'auto',
                    height: 13,
                    backgroundColor: '#1da1f2',
                    position: 'absolute',
                  }}
                  txt={'Team Details'}
                  onPress={() => {
                    setOpenedTeamDetails(room.joinedTeam ? room.joinedTeam.records : null);
                    showTeamDetailsModel();
                  }}
                />
              )}
            </View>
            {type == 'joinedRoom' && (
              <Ready txt={'Ready'} setCheck={val => setGuestReady(room, val, socket)} />
            )}
            {type != 'joinedRoom' &&
              room.settings &&
              room.settings.GuestReady == true && <Text style={{ fontSize: 30 }}>READY</Text>}
          </View>
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
              observer={
                _.has(room, 'settings') &&
                _.has(room.settings, 'observer') &&
                Object.keys(room.settings.observer).length > 0
                  ? room.settings.observer
                  : null
              }
              roomOwner={room.id === roomsReducer.createdRoom.id}
            />
            <SetDateTime
              date={
                _.has(room, 'settings') && _.has(room.settings, 'date') ? room.settings.date : ''
              }
              setDate={date => setRoomDate(room, date, socket)}
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
                <Text style={{ fontSize: 8, fontStyle: 'bold' }}>Location:</Text>
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
                      <Text style={{ fontSize: 6 }}>{location && location.address}</Text>
                    </View>
                  )}
                <View>
                  {(type == 'createdRoom' && (
                    <Btn
                      txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                      containerStyle={{
                        padding: 3,
                        width: 'auto',
                        height: 13,
                        backgroundColor: '#1da1f2',
                      }}
                      txt={`${location && location.address ? 'Change Location' : 'Set Location'}`}
                      onPress={() =>
                        navigate('SetLocation', {
                          SetLocation: locationCoordinates =>
                            setRoomLocation(room, locationCoordinates, socket),
                        })
                      }
                    />
                  )) || (
                    <Btn
                      txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
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
              txtStyle={{ fontStyle: 'bold', fontSize: 15, color: 'white' }}
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
});
const mapStateToProps = ({ auth, socket, roomsReducer, teamsReducer, model }) => ({
  team: teamsReducer.curntTeam,
  socket,
  roomsReducer,
  showTeamDetails: model.showTeamDetails,
});
const mapDispatchToProps = dispatch => ({
  showObserverModel() {
    dispatch(showObserverModel());
  },
  setOpenedTeamDetails(teamRecords) {
    dispatch(setOpenedTeamDetails(teamRecords));
  },
  showTeamDetailsModel() {
    dispatch(showTeamDetailsModel());
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

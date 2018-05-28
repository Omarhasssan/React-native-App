import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
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
} from '../actions';
import Observer from '../components/Observer';
import SetDateTime from './SetDateTime';
import openMap from 'react-native-open-maps';
import TeamInfo from '../components/Info';
import TeamDetailsWithModel from './TeamDetailsWithModel';
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
    const { date, room, type } = this.state;
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
    } = this.props;

    let navigate;
    if (type == 'createdRoom') navigate = stackNavigation.navigate;
    const location =
      room.settings && _.has(room.settings, 'location') ? room.settings.location : null;
    console.log('s', show);
    return (
      <View style={{ height: `${100}%` }}>
        {/* <Teams roomOwner={room.teamOwner} joinedTeam={room.joinedTeam} /> */}
        {showTeamDetails && <TeamDetailsWithModel />}

        <View
          style={{
            alignSelf: 'center',
            width: `${50}%`,
            height: `${40}%`,
            flexDirection: 'row',
            justifyContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            //backgroundColor: 'green',
          }}
        >
          <View>
            <TeamInfo
              userImgStyle={{ width: 40, height: 40 }}
              name={room.teamOwner && room.teamOwner.name}
            />
            {type != 'createdRoom' && (
              <Btn
                txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                containerStyle={{
                  padding: 3,
                  width: 'auto',
                  height: 13,
                  backgroundColor: '#1da1f2',
                  alignItems: 'center',
                }}
                txt={'Team Details'}
                onPress={() => {
                  setOpenedTeamDetails(room.teamOwner ? room.teamOwner.records : null);
                  showTeamDetailsModel();
                }}
              />
            )}
          </View>
          <View>
            <TeamInfo
              userImgStyle={{ width: 40, height: 40 }}
              name={room.joinedTeam && room.joinedTeam.name}
            />
            {type != 'joinedRoom' && (
              <Btn
                txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                containerStyle={{
                  padding: 3,
                  width: 'auto',
                  height: 13,
                  backgroundColor: '#1da1f2',
                  alignItems: 'center',
                }}
                txt={'Team Details'}
                onPress={() => {
                  setOpenedTeamDetails(room.joinedTeam ? room.joinedTeam.records : null);
                  showTeamDetailsModel();
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#edf1f7',
            flex: 1,

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
    padding: 20,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);

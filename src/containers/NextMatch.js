import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import openMap from 'react-native-open-maps';
import Btn from '../components/Btn';
import { showTeamDetailsModel } from '../actions';

class NextMatch extends Component {
  state = {
    show: false,
  };

  render() {
    const { nextMatch, showTeamDetailsModel } = this.props;
    const { show } = this.state;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ show: !this.state.show })}
          style={{ padding: 10, backgroundColor: '#1da1f2' }}
        >
          <Text>
            DATE: {nextMatch.date.month} - {nextMatch.date.day}
            {'  '} at : {nextMatch.date.time.hours} :{' '}
            {nextMatch.date.time.minutes}
          </Text>
        </TouchableOpacity>
        {show && (
          <View
            style={{
              height: 80,
              //flex: 1,
              padding: 10,
              backgroundColor: 'black',
            }}
          >
            <Text style={{ color: 'white' }}>
              Opponent Team : {nextMatch.oponnentTeam.name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white' }}>Team Records:</Text>
              <Btn
                onPress={() => {
                  showTeamDetailsModel(nextMatch.oponnentTeam.records);
                }}
                containerStyle={{
                  padding: 3,
                  width: 'auto',
                  backgroundColor: '#1da1f2',
                  alignItems: 'center',
                }}
                txtStyle={{ fontStyle: 'bold', fontSize: 8, color: 'white' }}
                txt={'Click here'}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Btn
                txtStyle={{ fontStyle: 'bold', fontSize: 8, color: 'white' }}
                containerStyle={{
                  padding: 3,
                  width: 'auto',
                  backgroundColor: '#1da1f2',
                  alignItems: 'center',
                }}
                onPress={() =>
                  openMap({
                    latitude: nextMatch.location.latitude,
                    longitude: nextMatch.location.longitude,
                  })
                }
                txt={'Click To Open Location in Maps'}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showTeamDetailsModel(teamRecords) {
    dispatch(showTeamDetailsModel(teamRecords));
  },
});
export default connect(null, mapDispatchToProps)(NextMatch);

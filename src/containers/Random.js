import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Btn from '../components/Btn';
import TeamInfo from '../components/Info';
import Ready from './CheckBox';

export default (Random = ({
  team,
  teamType,
  showTeamDetails,
  setReady,
  teamReady,
}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      //backgroundColor: 'yellow',
    }}
  >
    <TeamInfo
      userImgStyle={{ width: 40, height: 40 }}
      name={team && team.name}
    />
    <View style={{ marginBottom: 15, alignItems: 'center' }}>
      {teamType == 'opponentTeam' && (
        <Btn
          txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
          containerStyle={{
            padding: 3,
            width: 'auto',
            backgroundColor: '#1da1f2',
            position: 'absolute',
          }}
          txt={'Team Details'}
          onPress={showTeamDetails}
        />
      )}
    </View>

    {teamType == 'ownerTeam' && <Ready txt={'Ready'} setCheck={setReady} />}
    {teamType == 'opponentTeam' &&
      teamReady == true && (
        <View
          style={{
            width: 113,
            height: 60,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: `${100}%`,
              height: `${100}%`,
              backgroundColor: 'gray',
              opacity: '0.3',
              position: 'absolute',
            }}
          />
          <Text
            style={{
              fontSize: 30,
            }}
          >
            READY !
          </Text>
        </View>
      )}
  </View>
));
const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
  },
});

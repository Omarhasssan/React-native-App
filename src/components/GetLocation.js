import React, { Component } from 'react';
import { Button } from 'react-native';
import openMap from 'react-native-open-maps';

export default (GetLocation = () => (
  <Button
    color="#bdc3c7"
    onPress={openMap({ latitude: 37.865101, longitude: -119.53833 })}
    title="Click To Open Maps đş"
  />
));

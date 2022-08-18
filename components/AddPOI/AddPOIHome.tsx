import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Suggestion from './Suggestion';
import Search from './Search';

export default function AddPOIHome({ navigation }) {
  //props: city, lat, lng, order
  const city = 'sunnyvale';
  const lat = 37.3688;
  const lng = 121.0365;

  return (
    <View style={styles.container}>
      {/* {console.log('In AddPOIHome, city = ', city)} */}
      <Search style={styles.textInput} city={city} lat={lat} lng={lng} navigation={navigation} />
      <Suggestion city={city} navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
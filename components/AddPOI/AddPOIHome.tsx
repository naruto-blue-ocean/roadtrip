import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Suggestion from './Suggestion';
import Search from './Search';

export default function AddPOIHome({ navigation }) {
  //update the city to props received from "AddPOI"
  const city = 'sunnyvale';

  return (
    <View style={styles.container}>
      {console.log('In AddPOIHome, city = ', city)}
      <Search style={styles.textInput} city={city} navigation={navigation} />
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
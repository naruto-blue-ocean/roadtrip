import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigator from './AddPOINav';
import Suggestion from './Suggestion';
import Search from './Search';

export default function AddPOIHome() {
  //update the city to props after connected with "Trip Viewer"
  const city = 'sunnyvale';
  return (
    <View style={styles.container}>
      <Search />
      <Suggestion city={city} />
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
import React from 'react';
import {Text, View, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function City ( {cityInfo}: {cityInfo: any}) {
  console.log('within the city', cityInfo.name)
  return (
    <View style = {styles.container}>
      <Text style={styles.text}> {cityInfo.name} </Text>
    </View>
  )
};

var styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    padding: 10,
    width: 150,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#E2E6E4'
  },

  text: {
    fontSize: 18,

  }
})
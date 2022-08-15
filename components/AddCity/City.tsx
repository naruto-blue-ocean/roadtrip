import React from 'react';
import {Text, View, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function City ( {cityInfo}: {cityInfo: any}) {
  console.log('within the city', cityInfo.name)
  return (
    <View style = {styles.container}>
      <Text> {cityInfo.name} </Text>
    </View>
  )
};

var styles = StyleSheet.create({
  container: {
    borderWidth: 1
  }
})
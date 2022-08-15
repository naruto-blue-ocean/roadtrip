import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, Animated, PanResponder } from 'react-native';
import MainDrag from './MainDrag';

const destinations = ['San Diego', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']

export default function DestinationViewer() {

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
      <View style={styles.body}>
        <MainDrag />
        <MainDrag />
        <MainDrag />
      </View>
      {/* <ScrollView style={styles.body}>
        {destinations.map((destination) => (<Text key={destination}>{destination}</Text>))}
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
      </ScrollView> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#219EBC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    backgroundColor: '#FB8500',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

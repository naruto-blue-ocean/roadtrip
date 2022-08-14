import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const destinations = ['San Diego', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']

export default function DestinationViewer() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
      <ScrollView style={styles.body}>
        {destinations.map((destination) => (<Text key={destination}>{destination}</Text>))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    flex: 0.2,
    backgroundColor: '#219EBC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 0.8,
    backgroundColor: '#FB8500',
  }
});
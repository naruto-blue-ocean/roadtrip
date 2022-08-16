import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FlatList from './FlatList'

const destinations = ['San Diego', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']

export default function DestinationViewer() {
  const sampleTrip: Object = {
    id: 100,
    destinations: [
      {
        city: 'San Francisco',
        POIs: [
          {
            id: 1,
            name: 'Golden Gate Bridge',
            details: 'An iconic red bridge'
          },
          {
            id: 2,
            name: 'Dolores Park',
            details: 'A city park'
          },
          {
            id: 3,
            name: 'Dumpling Home',
            details: 'A Chinese restaurant specializing in dumplings'
          }
        ]
      },
      {
        city: 'San Diego',
        POIs: [
          {
            id: 4,
            name: 'Legoland',
            details: 'An amusement park featuring Legos'
          },
          {
            id: 5,
            name: 'Tacos El Gordo',
            details: 'A famous Mexican restaurant'
          },
          {
            id: 6,
            name: 'UC San Diego',
            details: 'A public university'
          }
        ]
      },
      {
        city: 'Los Angeles',
        POIs: [
          {
            id: 7,
            name: 'Griffith Observatory',
            details: 'An observatory with telecopes and exhibits'
          },
          {
            id: 8,
            name: 'Disneyland',
            details: 'The happiest place on Earth'
          },
          {
            id: 9,
            name: 'Hollywood',
            details: 'A hub for entertainment and media'
          }
        ]
      }
    ]

  }
  return (
    <View>
      <Text>Hi</Text>
      <FlatList POIs = {sampleTrip.destinations}/>
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
    backgroundColor: '#FB8500',
  }
});
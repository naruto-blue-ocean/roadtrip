import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, TouchableOpacity, Text, LayoutAnimation } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import FlatList from './FlatList'

export default function DestinationViewer() {
  const sampleTrip = {
    id: 100,
    destinations: [
      {
        id: 200,
        cityName: 'San Francisco',
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
        id: 300,
        cityName: 'San Diego',
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
        id: 400,
        cityName: 'Los Angeles',
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

  const [cities, setCities] = useState(sampleTrip.destinations);

  const renderCities = ({item, drag, isActive}) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPressIn={ () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setExpanded(prevState => !prevState);
          }}
          onLongPress={drag}
          disabled={isActive}
          style={styles.item}>
          <Text style={styles.title}>{item.cityName}</Text>
        </TouchableOpacity>
        {expanded && (
          <View>
            <FlatList POIs={item.POIs} currCity={item} cities={cities} setCities={setCities} />
          </View>
        )}
      </ScaleDecorator>
    )
  }

  return (
    <View>
      {console.log(cities)}
      <DraggableFlatList
        data={cities}
        onDragEnd={({data}) => {setCities(data)}}
        keyExtractor={item => item.cityName}
        renderItem={renderCities}
      />
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
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#2A9D8F',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
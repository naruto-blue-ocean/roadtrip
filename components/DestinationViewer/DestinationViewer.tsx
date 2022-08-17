import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, TouchableOpacity, Text, LayoutAnimation, ScrollView, Animated, Dimensions, Pressable } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import FlatList from './FlatList';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");


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
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
      <ScaleDecorator>
        <ScrollView
          contentContainerStyle={styles.scrollviewwrapper}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ], {useNativeDriver: false})}
          scrollEventThrottle={1}
        >
          <View style={styles.tilewrapper}>
            <Pressable
              onPressIn={ () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpanded(prevState => !prevState);
              }}
              style={styles.plusicon}
            >
              <FontAwesome name="plus-circle" size={36} color="white" />
            </Pressable>
            <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={styles.item}
          >
            <Text style={styles.title}>{item.cityName}</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.deleteicon}>
            <AntDesign name="delete" size={36} color="white" />
          </View>
        </ScrollView>
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
  scrollviewwrapper: {
    justifyContent: 'center',
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
    padding: 20,
    marginVertical: 8,
    width: '80%',
    alignItems: 'flex-start',
  },
  deleteicon: {
    backgroundColor: '#E76F51',
    padding: 20,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  tilewrapper: {
    backgroundColor: '#2A9D8F',
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusicon: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
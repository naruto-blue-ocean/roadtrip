import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, LayoutAnimation, ScrollView, Animated, Dimensions, Pressable, Modal, TextInput, Alert } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import POI_List from './POI_List';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import config from '../../config.js';
import axios from 'axios';

const { width: SCREEN_WIDTH } = Dimensions.get("window");


export default function DestinationViewer( {navigation}) {
  var navigation = useNavigation();
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };
  const handleShare = () => {

  }

  const renderCities = ({ item, drag, isActive }) => {
    const [expanded, setExpanded] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;


    const handleDelete = () => {
      let copyOfCities;
      cities.forEach((city, index) => {
        if (city.cityName === item.cityName) {
          copyOfCities = cities.slice(0, index).concat(cities.slice(index + 1));
        }
      });
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          150,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.scaleY
        )
      );
      setCities(copyOfCities);
    };


    return (
      <ScaleDecorator>
        <View style={styles.cityandpoiwrapper}>
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
                {expanded ? <FontAwesome name="minus-circle" size={36} color="white" /> : <FontAwesome name="plus-circle" size={36} color="white" />}
                </Pressable>
                <Pressable
                  onLongPress={drag}
                  disabled={isActive}
                  style={styles.item}
                >
                  <Text style={styles.title}>{item.cityName}</Text>
                </Pressable>
              </View>
              <View style={styles.deleteicon}>
                <Pressable
                  style={styles.deletearea}
                  onPressIn={handleDelete}
                >
                  <AntDesign name="delete" size={36} color="white" />
                </Pressable>
              </View>
          </ScrollView>
          {expanded && (
            <View style={styles.poiwrapper}>
              <POI_List POIs={item.POIs} currCity={item} cities={cities} setCities={setCities} />
            </View>
          )}
        </View>
      </ScaleDecorator>
    )
  }


  return (
    <View style={styles.wrapper}>
      <View style = {styles.addAndShareContainer}>
        <Pressable style={styles.addCity}
          onPress = {() =>
            navigation.navigate('AddCity', {trip_id: 1, current_num_destinations: 3 })
          }
          >
          <Text>Add Destinations &nbsp;</Text>
          <FontAwesome name="plus-circle" size={18} color = "white" style={styles.addPOIButton}/>
        </Pressable>
        <Pressable style={styles.share}
          onPress = {() => {}
          }
          >
          <Text>Share &nbsp;</Text>
          <FontAwesome name="plus-circle" size={18} color = "white" style={styles.addPOIButton}/>
        </Pressable>
      </View>
      <View style={styles.body}>
        <DraggableFlatList
          data={cities}
          onDragEnd={({data}) => {setCities(data)}}
          keyExtractor={item => item.cityName}
          renderItem={renderCities}
        />
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollviewwrapper: {
    justifyContent: 'center',
  },
  addAndShareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#219EBC',
  },
  body: {
    flex: 9,
    backgroundColor: '#FB8500',
  },
  container: {
    flex: 1,
  },
  item: {
    paddingVertical: 20,
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
    fontFamily: 'Georgia',
    color: 'white',
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
  },
  deletearea: {
    alignItems: 'center',
  },
  poiwrapper: {
    width: '100%',
  },
  addCity: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 6,
    width: '50%',
  },
  share: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 6,
    width: '50%'
  }
});
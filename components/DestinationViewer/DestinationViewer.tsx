import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, LayoutAnimation, ScrollView, Animated, Dimensions, Pressable, Modal, TextInput, Alert } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import POI_List from './POI_List';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import config from '../../config.js';
import axios from 'axios';


const { width: SCREEN_WIDTH } = Dimensions.get("window");


export default function DestinationViewer() {
  const route = useRoute();
  const navigation = useNavigation();
  const {tripId} = route.params;

  const getTrip = (tripId) => {
    const path = `${config.LOCALTUNNEL}/trips/tripinfo/${tripId}`
    axios.get(path)
    .then ((response) => {
      let trip = response.data;
      let cities = {};
      trip.forEach((row, index) => {
        if (cities[row.destination_name] && row.poi_id) {
          let poiObj = {};
          poiObj.id = row.poi_id;
          poiObj.name = row.poi_name;
          poiObj.order_number = row.poi_order
          cities[row.destination_name].POIs.push(poiObj)
        } else {
          cities[row.destination_name] = {
            lat: row.lat,
            lng: row.lng,
            POIs: [],
            order_number: row.destination_order,
            destination_id: row.destination_id
          };
          if (row.poi_id) {
            let poiObj = {};
            poiObj.id = row.poi_id;
            poiObj.name = row.poi_name;
            poiObj.order_number = row.poi_order
            cities[row.destination_name].POIs.push(poiObj)
          }
        }
      })
      let destinations = [];
      Object.keys(cities).forEach((key) => {
        let destObj = {
          cityName: key,
          destination_id: cities[key].destination_id,
          lat: cities[key].lat,
          lng: cities[key].lng,
          order_number: cities[key].order_number,
          POIs: cities[key].POIs
        };
        destinations.push(destObj);
      })
      setCities(destinations);

    })
    .catch((err) => {
      console.error('errored in getTrip', err)
    })
  }

  const updateDestinationOrder = (afterData:any) => {
    const beforeData = cities;
    const path = `${config.LOCALTUNNEL}/trips/${tripId}/destinations`

    const axiosObj = {}
    for (var i = 0; i < afterData.length; i++) {
      axiosObj[afterData[i].destination_id] = i + 1;
    }
    axios.put(path, axiosObj)
    .catch((err) => {
      console.error('errored in the POI put request', err);
      setCities(beforeData);
    })
    setCities(afterData);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getTrip(tripId);
  }, [isFocused])

  const [cities, setCities] = useState([]);
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

    const setPOIsAfterDelete = (newPOIs) => {
      item.POIs = newPOIs;
    }

    const handleDelete = () => {
      let copyOfCities;
      let beforeData = cities;
      let afterData = [];
      cities.forEach((city, index) => {
        if (city.cityName !== item.cityName) {
          afterData.push(city);
        }
      })
      const path = `${config.LOCALTUNNEL}/trips/${tripId}/destinations/${item.destination_id}`
      axios.delete(path)
      .catch((err) => {
        console.error('errored when deleted destination', err)
        setCities(beforeData);
      })
      setCities(afterData);

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          150,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.scaleY
        )
      );
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
              <POI_List
                POIs={item.POIs}
                currCity={item}
                cities={cities}
                setCities={setCities}
                tripId = {tripId}
                destinationId = {item.destination_id}
                lat = {item.lat}
                lng = {item.lng}
                cityName = {item.cityName}
                setPOIsAfterDelete = {setPOIsAfterDelete}
                />

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
          onPress = {() => {
            let maxIndex = 0;
            for (var i = 0; i < cities.length; i++) {
              if (cities[i]['order_number'] > maxIndex) {
                maxIndex = cities[i]['order_number'];
              }
            }

            navigation.navigate('AddCity', {trip_id: tripId, lastIndex: maxIndex})
          }
          }
          >
          <Text style = {styles.addDestination}>Add Destinations &nbsp;</Text>
          <FontAwesome name="plus-circle" size={18} color = "white" style={styles.addPOIButton}/>
        </Pressable>
        <Pressable style={styles.share}
          onPress = {() => {
            Alert.prompt('Share trip', 'Enter friend\'s email', (email) => {
              axios.post(`${config.LOCALTUNNEL}/share/${email}/${tripId}`)
                .then( (response) => {
                  Alert.alert('Sharing successful!', `Your friend ${email} can now access this trip`)
                })
                .catch( (e) => console.log(e))
          })}
          }
          >
          <Text>Share &nbsp;</Text>
          <FontAwesome name="plus-circle" size={18} color = "white" style={styles.addPOIButton}/>
        </Pressable>
      </View>
      <View style={styles.body}>
        <DraggableFlatList
          data={cities}
          onDragEnd={({data}) => updateDestinationOrder(data)}
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
    backgroundColor: '#D9814F',
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
  },
  addDestination: {
    backgroundColor: '#D9814F'
  }
});

/*
  destination_id1: order_number1,
  destination_id2: order_number2
  CURRENT ORDER:
  ChIJfcS6fx7LwoARZYDiqXgXL6E: 1,
  ChIJSzbuqjfD3IARckzIEB2RVeg: 2,
  ChIJpYrtFq413YARX4eG8Fd9FAQ: 3
  PROPOSED ORDER:
  ChIJfcS6fx7LwoARZYDiqXgXL6E: 1,
  ChIJSzbuqjfD3IARckzIEB2RVeg: 3,
  ChIJpYrtFq413YARX4eG8Fd9FAQ: 2
*/


/*const sampleTrip = {
=======
/*
const sampleTrip = {
>>>>>>> jason-branch
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
  } */
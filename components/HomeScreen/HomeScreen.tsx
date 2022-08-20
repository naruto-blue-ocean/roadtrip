import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, ScrollView, ImageBackground } from 'react-native';
import TripCard from './TripCard';
import axios from 'axios';
import config from '../../config';
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from '../../AuthProvider.js'
import { withStyleAnimation } from 'react-native-reanimated/lib/types/lib/reanimated2/animation';
import { FlipInEasyX } from 'react-native-reanimated';


export default function HomeScreen(props: any) {

  const [tripsShowing, setTripsShowing] = useState([]);
  const { username } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    let userEmail = username || 'noa@email.com';
    axios.get(`${config.LOCALTUNNEL}/trips/${userEmail}`)
    .then((results) => {
      setTripsShowing(results.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/road.png')} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {
            tripsShowing.map((trip: any) => {
              // console.log('Trip ID: ', trip.id);
              return (<TripCard key={trip.id} tripId={trip.id} tripName={trip.name} tripStatus={trip.status} />)
            })
          }
          <StatusBar style="auto" />
        </ScrollView>
        <View
        style={styles.newTripContainer}
        onTouchEnd={(e) => {
          e.preventDefault();
          let userEmail = username || 'noa@email.com'
          Alert.prompt('Create a new trip', 'Choose a name for your trip!', (text) => {
            axios.post(`${config.LOCALTUNNEL}/trips`,{
              tripName: text,
              email: userEmail
            })
            .then((response: any) => {
              var tripData: any = {};
              tripData.tripId = response.data.trip_id;
              tripData.tripName = text;
              setTripsShowing([...tripsShowing, {id: response.data.trip_id, name: text, status: "planned"}])
              navigation.navigate('DestinationViewer', tripData);
            })
            .catch((err: Error) => {
              console.error(err);
            })
          })
        }}>
          <Text style={styles.newTripText}>Create a new trip</Text>
          <Text style={styles.plus}>+</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scroll: {
    display: 'flex',
    alignItems: 'center',
  },
  backgroundImage: {
    marginTop: 25,
    marginRight: 0,
    marginLeft: 0,
    justifyContent: 'space-between',
  },
  newTripContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    width: 265,
    backgroundColor: '#B0C4B1',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 20,
    position: 'relative',
    left: 45,
  },
  newTripText: {
    fontSize: 18,
    marginLeft: 30,
    color: 'white',
  },
  plus: {
    marginRight: 27,
    fontSize: 25,
    color: 'white',
  },
  modal: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 35,
    margin: 20
  },
  page: {

  }
});
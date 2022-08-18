import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, Alert } from 'react-native';
import TripCard from './TripCard';
import axios from 'axios';
import config from '../../config';


export default function HomeScreen(props: any) {

  const [showingModal, setShowingModal] = useState(false);
  const [tripsShowing, setTripsShowing] = useState([]);

  useEffect(() => {
    let userEmail = 'noa@email.com';
    axios.get(`${config.LOCALTUNNEL}/trips/${userEmail}`)
    .then((results) => {
      setTripsShowing(results.data);
      console.log(results.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <View style={styles.container}>
      {
        tripsShowing.map((trip: any) => {
          return (<TripCard key={trip.id} tripName={trip.name} tripStatus={trip.status}/>)
        })
      }
      <View
        style={styles.newTripContainer}
        onTouchEnd={(e) => {
          let userEmail = 'noa@email.com'
          Alert.prompt('Create a new trip', 'Choose a name for your trip!', (text) => {
            axios.post(`${config.LOCALTUNNEL}/trips`,{
              tripName: text,
              email: userEmail
            })
            .then((response: any) => {
              console.log(response.data)
            })
            .catch((err: Error) => {
              console.error(err);
            })
          })
        }}>
        <Text style={styles.newTripText}>Create a new trip</Text>
        <Text style={styles.plus}>+</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  newTripContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 10,
    margin: 20,
  },
  newTripText: {
    marginLeft: 30,
  },
  plus: {
    marginRight: 27,
    fontSize: 25,
    color: 'grey',
  },
  modal: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 35,
    margin: 20
  }
});
import React, { useState, useEffect, useContext, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import TripCard from './TripCard';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../AuthProvider.js'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen(props: any) {

  const [showingModal, setShowingModal] = useState(false);
  const [tripsShowing, setTripsShowing] = useState([]);
  const { currentTripId, setCurrentTripId, username } = useContext(AuthContext)

  const navigation = useNavigation()
  const scrollViewRef = useRef();


  useEffect(() => {
    // let userEmail = 'noa@email.com';
    axios.get(`${config.LOCALTUNNEL}/trips/${username}`)
      .then((results) => {
        setTripsShowing(results.data);
        console.log(results.data);
      })
      .catch((error) => {
        console.error(error);
      })

    console.log(username)
  }, [])

  return (
    <>
      <ScrollView ref={scrollViewRef} style={styles.container}>
        {
          tripsShowing.map((trip: any) => {
            console.log('Trip ID: ', trip.id);
            return (<TripCard key={trip.id} tripId={trip.id} tripName={trip.name} tripStatus={trip.status} />)
          })
        }

        <StatusBar style="auto" />
      </ScrollView>

      <View
        style={styles.newTripContainer}
        onTouchEnd={(e) => {
          // let userEmail = 'noa@email.com'
          e.preventDefault();
          Alert.prompt('Create a new trip', 'Choose a name for your trip!', (text) => {
            axios.post(`${config.LOCALTUNNEL}/trips`, {
              tripName: text,
              email: username
            })
              .then((response: any) => {
                console.log('TRIP ID IS...', response.data)
                setCurrentTripId(response.data.trip_id)
                setTripsShowing([...tripsShowing, { id: response.data.trip_id, name: text, status: "planned" }])
                scrollViewRef.current.scrollToEnd({animated: true})

              })
          })
        }}>
        <Text style={styles.newTripText}>Create a new trip</Text>
        <Text style={styles.plus}>+</Text>
      </View>
    </>
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
    justifyContent: 'space-between',
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
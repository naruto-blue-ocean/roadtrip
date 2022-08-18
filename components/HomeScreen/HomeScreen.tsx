import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import TripCard from './TripCard';
import axios from 'axios';
import config from '../../config.js'

export default function HomeScreen(props: any) {

  const [showingModal, setShowingModal] = useState(false);
  const [tripsShowing, setTripsShowing] = useState([]);

  useEffect(() => {
    let userEmail = 'noa@email.com';
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
      {
        tripsShowing.map((trip: any) => {
          return (<TripCard tripName={trip.name} tripStatus={trip.status}/>)
        })
      }
      <View style={styles.newTripContainer} onTouchEnd={(e) => setShowingModal(true)}>
        <Text style={styles.newTripText}>Create a new trip</Text>
        <Text style={styles.plus}>+</Text>
      </View>
      <View>
        <Modal
        animationType="slide"
        visible={showingModal}
        style={styles.modal}
        transparent={true}
        >
          <View>
            <Text>Modal window</Text>
          </View>
          <TextInput/>
          <Pressable onPress={() => {setShowingModal(false)}}>
            <Text>
              Close
            </Text>
          </Pressable>
          <Pressable onPress={() => {setShowingModal(false)}}>
            <Text>
              Submit
            </Text>
          </Pressable>
        </Modal>
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
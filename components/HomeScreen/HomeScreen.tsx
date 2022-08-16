import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import TripCard from './TripCard';

export default function HomeScreen() {

  const [showingModal, setShowingModal] = useState(false);

  return (
    <View style={styles.container}>
      <TripCard />
      <TripCard />
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
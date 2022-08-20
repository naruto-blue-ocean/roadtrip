import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CompletedList from './CompletedList';
import TrashList from './TrashList';
import axios from 'axios';
import config from '../../config.js'


export default function Archive() {

  const [whichTab, setWhichTab] = useState('Completed')
  const [trashTrips, setTrashTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);



  useEffect(() => {
    let userEmail = 'noa@email.com';
    axios.get(`${config.LOCALTUNNEL}/trips/archive/${userEmail}`)
    .then(({data}) => {
      var trash = [];
      var completed = [];
      for (let trip in data) {
        if(data[trip].status === 'trash'){
          trash.push(data[trip]);
        }
        else if (data[trip].status === 'completed'){
          completed.push(data[trip]);
        }
      }
      setCompletedTrips(completed);
      setTrashTrips(trash);
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setWhichTab('Completed')}
          style={styles.tab}
        >
          <Text>Completed</Text>
        </Pressable>
        <Pressable
          onPress={() => setWhichTab('Trash')}
          style={styles.tab}
        >
          <Text>Trash</Text>
        </Pressable>
      </View>

      <View style={styles.items}>
        {whichTab === 'Completed' &&
          <CompletedList completedTrips={completedTrips}/>
        }
        {whichTab === 'Trash' &&
          <TrashList trashTrips={trashTrips} setTrashTrips={setTrashTrips}/>
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabs: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
  },
  tab:{
    width: 120,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    backgroundColor: '#B0C4B1',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  items: {
    flex: 7,
  }
});
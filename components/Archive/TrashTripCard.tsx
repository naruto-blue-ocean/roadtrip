import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import config from '../../config.js';

export default function TrashTripCard(props: any) {

  const navigation = useNavigation();

  const removeThisCard = () => {
    var trash = props.trashTrips.slice();
    for(let i = 0; i < trash.length; i++) {
      if (trash[i].id === props.trip.id) {
        trash.splice(i, 1);
        break;
      }
    }
    props.setTrashTrips(trash);
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('DestinationViewer', {
          tripId: props.trip.id,
          tripName: props.trip.name
        })
      }}
    >
      <Text style={styles.tripName}>{props.trip.name}</Text>
      <View style={styles.options}>
        <Pressable
          style={styles.option}
          onPress={() => {
            axios.put(`${config.LOCALTUNNEL}/trips/recover/${props.trip.id}`)
            .then(() => {
              removeThisCard();
            })
            .catch((err) => {
              console.error(err);
            })
          }}
        >
          <Text>Recover</Text>
        </Pressable>
        <Pressable
          style={styles.option}
          onPress={() => {
            axios.delete(`${config.LOCALTUNNEL}/trips/${props.trip.id}`)
            .then(() => {
              removeThisCard();
            })
            .catch((err) => {
              console.error(err);
            })
          }}
        >
          <Text>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    flexDirection: 'row',
    height: 60,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 10,
    margin: 20,
  },
  tripName: {
    marginLeft: 30
  },
  options: {
    borderStyle: 'solid',
    borderRadius: 5,
    margin: 20,
    borderWidth: 1,
    borderColor: 'grey'
  },
  option: {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey'
  }
})
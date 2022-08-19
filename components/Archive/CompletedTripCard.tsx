import React, {useState} from 'react';
import { StyleSheet, Text, Pressable} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function CompletedTripCard(props: any) {

  const navigation = useNavigation();

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
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 65,
    width: 250,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 20,
  },
  tripName: {
    marginLeft: 30
  },
  options: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  },
})
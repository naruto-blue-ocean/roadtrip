import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CompletedTripCard(props: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.tripName}>{props.trip.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent:'flex-start',
    borderRadius: 10,
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
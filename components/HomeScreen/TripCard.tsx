import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TripCard() {

  const [active, setActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.tripName}>Trip name</Text>
      <View style={ active ? styles.greenIndicator : styles.redIndicator}></View>
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
    justifyContent:'space-between',
    borderRadius: 10,
    margin: 20,
  },
  tripName: {
    marginLeft: 30
  },
  greenIndicator: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  },
  redIndicator: {
    width: 10,
    height: 10,
    backgroundColor: '#f14c56',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  }
})
import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

export default function TrashTripCard(props: any) {

  const [active, setActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.tripName}>{props.trip.name}</Text>
      <View style={styles.options}>
        <Pressable>
          <Text>Options</Text>
        </Pressable>
      </View>
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
  options: {
    backgroundColor: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  },
})
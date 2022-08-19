import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function TrashTripCard(props: any) {

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
      <View style={styles.options}>
        <Pressable style={styles.option}>
          <Text>Recover</Text>
        </Pressable>
        <Pressable style={styles.option}>
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
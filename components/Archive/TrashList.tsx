import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrashTripCard from './TrashTripCard';

export default function CompletedList(props: any) {
  return (
    <View>
      {props.trashTrips.map((trip: any) => {
        return (<TrashTripCard trip={trip}/>)
      })}
    </View>
  )
}
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CompletedTripCard from './CompletedTripCard';

export default function CompletedList(props: any) {
  return (
    <View>
      {props.completedTrips.map((trip: any) => {
        return (<CompletedTripCard trip={trip}/>)
      })}
    </View>
  )
}
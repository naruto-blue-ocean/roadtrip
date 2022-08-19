import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrashTripCard from './TrashTripCard';

export default function CompletedList(props: any) {

  useEffect(() => {

  }, [])

  return (
    <View>
      {props.trashTrips.map((trip: any) => {
        return (<TrashTripCard trip={trip} trashTrips={props.trashTrips} setTrashTrips={props.setTrashTrips}/>)
      })}
    </View>
  )
}
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TrashTripCard from './TrashTripCard';

export default function CompletedList() {
  return (
    <View>
      <TrashTripCard/>
      <TrashTripCard/>
    </View>
  )
}
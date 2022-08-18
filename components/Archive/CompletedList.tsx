import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CompletedTripCard from './CompletedTripCard';

export default function CompletedList() {
  return (
    <View>
      <CompletedTripCard/>
      <CompletedTripCard/>
    </View>
  )
}
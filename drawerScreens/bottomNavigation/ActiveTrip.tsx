import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import DestinationViewer from "../../components/DestinationViewer/DestinationViewer";
import axios from 'axios';
import config from '../../config.js'
import { AuthContext } from '../../AuthProvider.js'

const Stack = createStackNavigator();

export default function ActiveTrip() {

  const { username } = useContext(AuthContext);
  let tripId = 1;


  const path = `${config.LOCALTUNNEL}/trips/${username}/active`
  axios.get(path)
  .then((response) => {
    let tripId = response.data.id
  })
  .catch((err) => {
    console.error('errored in gettingActiveTrip', err)
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DestinationViewer tripId = {tripId} />
    </View>
  )
}
import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from '@react-navigation/native';
import DestinationViewer from "../../components/DestinationViewer/DestinationViewer";
import axios from 'axios';
import config from '../../config.js';
import { AuthContext } from '../../AuthProvider.js';
import getTrip from '../../components/DestinationViewer/getTrip';

const Stack = createStackNavigator();

export default function ActiveTrip() {

  const { username } = useContext(AuthContext);
  const [ tripId, setTripId ] = useState(null);
  const [cities, setCities] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
    const path = `${config.LOCALTUNNEL}/trips/${username}/active`
    axios.get(path)
      .then((response) => {
        console.log('response received');
        setTripId(response.data.id);
        getTrip(response.data.id, setCities);
      })
      .catch((err) => {
        console.error('errored in gettingActiveTrip', err)})
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* {console.log()} */}
      {tripId && cities && (<DestinationViewer tripId={tripId} cities={cities} />)}
    </View>
  )
}
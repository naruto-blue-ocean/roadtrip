import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPOIHome from './AddPOIHome';
import POIList from './POIList';

const Stack = createNativeStackNavigator();

export default function AddPOI() {
  //update the city to props after connected with "Trip Viewer"
  const city = 'sunnyvale';
  return (
    <Stack.Navigator initialRouteName="AddPOIHome">
      {/* /* need to pass city to <AddPOIHome /> */}
      <Stack.Screen name="AddPOIHome" component={AddPOIHome} options={{headerShown: false}} />
      {/* remove global header/ move the screen to app.tsx */}
      <Stack.Screen name="POIList" component={POIList} options={{headerShown: false}} />
    </Stack.Navigator>

  );
}
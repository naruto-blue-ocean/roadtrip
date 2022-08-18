import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DestinationViewer from '../DestinationViewer/DestinationViewer';
import AddPOIHome from './AddPOIHome';
import POIList from './POIList';

const Stack = createNativeStackNavigator();

export default function AddPOI() {
  //props: city, lat, lng, order
  const city = 'sunnyvale';
  const order = 2;
  // const { } = params...
  return (
    <Stack.Navigator initialRouteName="AddPOIHome">
      {/* need to pass city, lat, lng to <AddPOIHome /> */}
      <Stack.Screen name="AddPOIHome" component={AddPOIHome} options={{headerShown: false}} />
      {/* need to pass order to <POIList /> */}
      <Stack.Screen name="POIList" component={POIList} options={{headerShown: false}} />
      <Stack.Screen name="DestinationViewer" component={DestinationViewer} options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>

  );
}
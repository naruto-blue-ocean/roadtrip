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

export default function AddPOI({ route }) {
  //props: city, lat, lng, order, desId
  // const { city, term } = route.params;

  const city = 'sunnyvale';
  const lat = 37.3688;
  const lng = 121.0365;
  const order = 2;

  return (
    <Stack.Navigator initialRouteName="AddPOIHome">
      <Stack.Screen
        name="AddPOIHome"
        children={() => (
          <AddPOIHome city={city} lat={lat} lng={lng} />
        )}
        options={{headerShown: false}}
      />
      {/* need to pass order to <POIList /> */}
      <Stack.Screen
        name="POIList"
        children={() => (
          <POIList city={city} lat={lat} lng={lng} />
        )}
        options={{headerShown: false}} />
      <Stack.Screen
        name="DestinationViewer"
        component={DestinationViewer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
/*
    <Stack.Screen
      name="Login"
      children={() => (<Login /> )}  options={{headerShown: false}} />
    <Stack.Screen name="DrawerNavigatorRoutes" children={() => (<DrawerNavigatorRoutes /> )}  options={{headerShown: false}}/>
*/
  );
}
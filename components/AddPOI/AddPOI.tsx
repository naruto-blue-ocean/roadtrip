import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import DestinationViewer from '../DestinationViewer/DestinationViewer';
import AddPOIHome from './AddPOIHome';
import POIList from './POIList';

const Stack = createNativeStackNavigator();

export default function AddPOI({ }) {
  //props: city, lat, lng, order, desId
  const route = useRoute();

  const { destination_id, trip_id, current_num_POIs, term, latitude, longitude, cityName } = route.params;
  const city = cityName;
  const lat = latitude;
  const lng = longitude;
  const order = current_num_POIs;
  const tripID = trip_id;
  const desID = destination_id;

  // const city = 'sunnyvale';
  // const lat = 37.3688;
  // const lng = 122.0363;
  // const order = 1;
  // const tripID = 200;
  // const desID = 200;

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
          <POIList order={order} desID={desID} tripID={tripID} />
        )}
        options={{headerShown: false}} />
      <Stack.Screen
        name="DestinationViewer"
        component={DestinationViewer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
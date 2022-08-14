import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import PoiViewer from './components/PoiViewer';
import DestinationViewer from './components/DestinationViewer/DestinationViewer';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="DestinationViewer"
          component={DestinationViewer}
          options={{ title: 'Destinations' }}
        />
        <Stack.Screen
          name="POIViewer"
          component={PoiViewer}
          options={{ title: 'Points Of Interest' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

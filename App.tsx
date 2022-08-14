/* Louisa's section -- uncomment to work on Navigation & Flow
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import PoiViewer from './components/PoiViewer.tsx';
import MainNavigation from './drawerScreens/Login'; //Testing
import { NavigationContainer } from "@react-navigation/native"; //Testing
import Login from './drawerScreens/Login'; //Testing
import DrawerNavigatorRoutes from './drawerScreens/DrawerNavigatorRoutes'; //Testing
import { createStackNavigator } from "@react-navigation/stack"; //Testing

Louisa's section -- uncomment to work on Navigation & Flow */

// const Stack = createStackNavigator(); //Testing
// <View style={styles.container}>
    //   <Text>Stuff</Text>
    //   {/* <MainNavigation /> */}

    //   <StatusBar style="auto" />
    // </View>

    //ss

/* Louisa's section -- uncomment to work on Navigation and flow
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name="Login" children={() => (<Login /> )}  options={{headerShown: false}} />
        <Stack.Screen name="DrawerNavigatorRoutes" children={() => (<DrawerNavigatorRoutes /> )}  options={{headerShown: false}}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}
*/


/* Binh's section to temporarily render everyone's components - work on flow later */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FakeHomeScreen from './components/FakeHomeScreen/FakeHomeScreen';
import PoiViewer from './components/PoiViewer';
import DestinationViewer from './components/DestinationViewer/DestinationViewer';
import AddCity from './components/AddCity/AddCityIndex';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FakeHomeScreen"
          component={FakeHomeScreen}
          options={{ title: 'Fake Home' }}
        />
        <Stack.Screen
          name="DestinationViewer"
          component={DestinationViewer}
          options={{ title: 'Destinations' }}
        />
        <Stack.Screen
          name="AddCity"
          component={AddCity}
          options={{ title: 'Add a Destination' }}
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

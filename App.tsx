import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import PoiViewer from './components/PoiViewer.tsx';
import MainNavigation from './drawerScreens/Login'; //Testing
import { NavigationContainer } from "@react-navigation/native"; //Testing
import Login from './drawerScreens/Login'; //Testing
import DrawerNavigatorRoutes from './drawerScreens/DrawerNavigatorRoutes'; //Testing
import { createStackNavigator } from "@react-navigation/stack"; //Testing

const Stack = createStackNavigator(); //Testing
// <View style={styles.container}>
    //   <Text>Stuff</Text>
    //   {/* <MainNavigation /> */}

    //   <StatusBar style="auto" />
    // </View>

    //ss

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

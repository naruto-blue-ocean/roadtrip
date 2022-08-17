import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FakeHomeScreen from './components/FakeHomeScreen/FakeHomeScreen';
import PoiViewer from './components/POIViewer/PoiViewer';
import DestinationViewer from './components/DestinationViewer/DestinationViewer';
import AddCity from './components/AddCity/AddCityIndex';
import HomeScreen from './components/HomeScreen/HomeScreen';
import AddPOI from './components/AddPOI/AddPOI';
import Initialization from './components/Initialization/Initialization';
import Login from './components/Login/Login';
import Archive from './components/Archive/Archive';
import AuthProvider, { AuthContext } from './AuthProvider';
// import AuthProvider from './AuthProvider';

const Stack = createNativeStackNavigator();

export default function Root() {

  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const [checking, setIsChecking] = React.useState(true);

  // NOTICE: There are two versions of the return block, the first commented out block includes the login page and the second doesn't. If you want to switch, just comment/uncomment out one of the return blocks.

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="FakeHomeScreen">
  //       {
  //         isLoggedIn ? (
  //           <>
  //             <Stack.Screen
  //               name="FakeHomeScreen"
  //               component={FakeHomeScreen}
  //               options={{ title: 'Fake Home' }}
  //             />
  //             <Stack.Screen
  //               name="HomeScreen"
  //               component={HomeScreen}
  //               options={{ title: 'Home' }}
  //             />
  //             <Stack.Screen
  //               name="Archive"
  //               component={Archive}
  //               options={{ title: 'View Archived Trips' }}
  //             />
  //             <Stack.Screen
  //               name="DestinationViewer"
  //               component={DestinationViewer}
  //               options={{ title: 'Destinations' }}
  //             />
  //             <Stack.Screen
  //               name="POIViewer"
  //               component={PoiViewer}
  //               options={{ title: 'Points Of Interest' }}
  //             />
  //             <Stack.Screen
  //               name="AddCity"
  //               component={AddCity}
  //               options={{ title: 'Add a Destination' }}
  //             />
  //             <Stack.Screen
  //               name="AddPOI"
  //               component={AddPOI}
  //               options={{ title: 'Add a Point of Interest' }}
  //             />
  //           </>
  //         ) : (
  //           <>
  //             {/* <Stack.Screen
  //               name="Initialization"
  //               component={Initialization}
  //               options={{ title: 'Initialization' }}
  //             /> */}
  //             <Stack.Screen
  //               name="Login"
  //               component={Login}
  //               options={{ title: 'Log In' }}
  //             />
  //           </>
  //         )
  //       }

  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FakeHomeScreen">
            <>
              <Stack.Screen
                name="FakeHomeScreen"
                component={FakeHomeScreen}
                options={{ title: 'Fake Home' }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'Home' }}
              />
              <Stack.Screen
                name="Archive"
                component={Archive}
                options={{ title: 'View Archived Trips' }}
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
              <Stack.Screen
                name="AddCity"
                component={AddCity}
                options={{ title: 'Add a Destination' }}
              />
              <Stack.Screen
                name="AddPOI"
                component={AddPOI}
                options={{ title: 'Add a Point of Interest' }}
              />
            </>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

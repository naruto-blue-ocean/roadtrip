// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import FakeHomeScreen from "./components/FakeHomeScreen/FakeHomeScreen";
// import PoiViewer from "./components/POIViewer/PoiViewer";
// import DestinationViewer from "./components/DestinationViewer/DestinationViewer";
// import AddCity from "./components/AddCity/AddCityIndex";
// import HomeScreen from "./components/HomeScreen/HomeScreen";
// import AddPOI from "./components/AddPOI/AddPOI";
// import Initialization from "./components/Initialization/Initialization";
// import Login from "./components/Login/Login";
// import Archive from "./components/Archive/Archive";
// import AuthProvider, { AuthContext } from "./AuthProvider";
// // import AuthProvider from './AuthProvider';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
//   useInfiniteQuery,
// } from "react-query";

// const Stack = createNativeStackNavigator();
// const queryClient = new QueryClient();

// export default function Root() {
//   const { username, setUsername } = React.useContext(AuthContext);

//   const [checking, setIsChecking] = React.useState(true);

//   // NOTICE: There are two versions of the return block, the first commented out block includes the login page and the second doesn't. If you want to switch, just comment/uncomment out one of the return blocks.

//   return (
//     <QueryClientProvider client={queryClient}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="FakeHomeScreen">
//           {username !== null ? (
//             <>
//               <Stack.Screen
//                 name="FakeHomeScreen"
//                 component={FakeHomeScreen}
//                 options={{ title: "Fake Home" }}
//               />
//               <Stack.Screen
//                 name="HomeScreen"
//                 component={HomeScreen}
//                 options={{ title: "Home" }}
//               />
//               <Stack.Screen
//                 name="Archive"
//                 component={Archive}
//                 options={{ title: "View Archived Trips" }}
//               />
//               <Stack.Screen
//                 name="DestinationViewer"
//                 component={DestinationViewer}
//                 options={{ title: "Destinations" }}
//               />
//               <Stack.Screen
//                 name="POIViewer"
//                 component={PoiViewer}
//                 options={{ title: "Points Of Interest" }}
//               />
//               <Stack.Screen
//                 name="AddCity"
//                 component={AddCity}
//                 options={{ title: "Add a Destination" }}
//               />
//               <Stack.Screen
//                 name="AddPOI"
//                 component={AddPOI}
//                 options={{ title: "Add a Point of Interest" }}
//               />
//             </>
//           ) : (
//             <Stack.Screen
//               name="Login"
//               component={Login}
//               options={{ title: "Log In" }}
//             />
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </QueryClientProvider>
//   );

//   // return (
//   //   <QueryClientProvider client={queryClient}>
//   //     <NavigationContainer>
//   //       <Stack.Navigator initialRouteName="FakeHomeScreen">
//   //         <>
//   //           <Stack.Screen
//   //             name="FakeHomeScreen"
//   //             component={FakeHomeScreen}
//   //             options={{ title: 'Fake Home' }}
//   //           />
//   //           <Stack.Screen
//   //             name="HomeScreen"
//   //             component={HomeScreen}
//   //             options={{ title: 'Home' }}
//   //           />
//   //           <Stack.Screen
//   //             name="Archive"
//   //             component={Archive}
//   //             options={{ title: 'View Archived Trips' }}
//   //           />
//   //           <Stack.Screen
//   //             name="DestinationViewer"
//   //             component={DestinationViewer}
//   //             options={{ title: 'Destinations' }}
//   //           />
//   //           <Stack.Screen
//   //             name="POIViewer"
//   //             component={PoiViewer}
//   //             options={{ title: 'Points Of Interest' }}
//   //           />
//   //           <Stack.Screen
//   //             name="AddCity"
//   //             component={AddCity}
//   //             options={{ title: 'Add a Destination' }}
//   //           />
//   //           <Stack.Screen
//   //             name="AddPOI"
//   //             component={AddPOI}
//   //             options={{ title: 'Add a Point of Interest' }}
//   //           />
//   //         </>
//   //       </Stack.Navigator>
//   //     </NavigationContainer>
//   //   </QueryClientProvider>
//   // )
// }

//Louisa's section -- uncomment to work on Navigation & Flow
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import PoiViewer from './components/PoiViewer.tsx';
import MainNavigation from "./drawerScreens/Login"; //Testing
import { NavigationContainer } from "@react-navigation/native"; //Testing
// import Login from './drawerScreens/Login'; //Testing
import DrawerNavigatorRoutes from "./drawerScreens/DrawerNavigatorRoutes"; //Testing
import { createStackNavigator } from "@react-navigation/stack"; //Testing
import AuthProvider, { AuthContext } from "./AuthProvider";
//NEW THINGS TO IMPORT
import FakeHomeScreen from "./components/FakeHomeScreen/FakeHomeScreen";
import Login from "./components/Login/Login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Archive from "./components/Archive/Archive";
import AuthProvider, { AuthContext } from "./AuthProvider";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useInfiniteQuery,
} from "react-query";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

// //Louisa's section -- uncomment to work on Navigation & Flow

// const Stack = createStackNavigator(); //Testing
// const queryClient = new QueryClient();
/*<View>
  <Text>Stuff</Text>
  <MainNavigation />

  <StatusBar style="auto" />
</View>
*/

//Louisa's section -- uncomment to work on Navigation and flow
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator  initialRouteName="Login">
//         <Stack.Screen name="Login" children={() => (<Login /> )}  options={{headerShown: false}} />
//         <Stack.Screen name="DrawerNavigatorRoutes" children={() => (<DrawerNavigatorRoutes /> )}  options={{headerShown: false}}/>
//       </Stack.Navigator>
//   </NavigationContainer>
//   );
// }

export default function Root() {
  const { username, setUsername } = React.useContext(AuthContext);

  const [checking, setIsChecking] = React.useState(true);

  // NOTICE: There are two versions of the return block, the first commented out block includes the login page and the second doesn't. If you want to switch, just comment/uncomment out one of the return blocks.

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="HomeScreen">
  //         {
  //           username !== null ? (
  //             <>
  //               {/* <Stack.Screen
  //                 name="FakeHomeScreen"
  //                 component={FakeHomeScreen}
  //                 options={{ title: 'Fake Home' }}
  //               /> */}
  //               <Stack.Screen
  //                 name="HomeScreen"
  //                 component={HomeScreen}
  //                 options={{ title: 'Home' }}
  //               />
  //               <Stack.Screen
  //                 name="Archive"
  //                 component={Archive}
  //                 options={{ title: 'View Archived Trips' }}
  //               />
  //               <Stack.Screen
  //                 name="DestinationViewer"
  //                 component={DestinationViewer}
  //                 options={{ title: 'Destinations' }}
  //               />
  //               <Stack.Screen
  //                 name="POIViewer"
  //                 component={PoiViewer}
  //                 options={{ title: 'Points Of Interest' }}
  //               />
  //               <Stack.Screen
  //                 name="AddCity"
  //                 component={AddCity}
  //                 options={{ title: 'Add a Destination' }}
  //               />
  //               <Stack.Screen
  //                 name="AddPOI"
  //                 component={AddPOI}
  //                 options={{ title: 'Add a Point of Interest' }}
  //               />
  //             </>

  //           ) : (
  //             <Stack.Screen
  //               name="Login"
  //               component={Login}
  //               options={{ title: 'Log In' }}
  //             />
  //           )
  //         }
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </QueryClientProvider>
  // )

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {username !== null ? (
            <Stack.Screen
              name="DrawerNavigatorRoutes"
              children={() => <DrawerNavigatorRoutes />}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              children={() => <Login />}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );

  //       <Stack.Navigator initialRouteName="FakeHomeScreen">
  //         <>
  //           <Stack.Screen
  //             name="FakeHomeScreen"
  //             component={FakeHomeScreen}
  //             options={{ title: 'Fake Home' }}
  //           />
  //           <Stack.Screen
  //             name="HomeScreen"
  //             component={HomeScreen}
  //             options={{ title: 'Home' }}
  //           />
  //           <Stack.Screen
  //             name="Archive"
  //             component={Archive}
  //             options={{ title: 'View Archived Trips' }}
  //           />
  //           <Stack.Screen
  //             name="DestinationViewer"
  //             component={DestinationViewer}
  //             options={{ title: 'Destinations' }}
  //           />
  //           <Stack.Screen
  //             name="POIViewer"
  //             component={PoiViewer}
  //             options={{ title: 'Points Of Interest' }}
  //           />
  //           <Stack.Screen
  //             name="AddCity"
  //             component={AddCity}
  //             options={{ title: 'Add a Destination' }}
  //           />
  //           <Stack.Screen
  //             name="AddPOI"
  //             component={AddPOI}
  //             options={{ title: 'Add a Point of Interest' }}
  //           />
  //         </>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </QueryClientProvider>
  // )
}

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import the bottom tabs
import AllTrips from "./bottomNavigation/AllTrips";
import HomeScreen from "../components/HomeScreen/HomeScreen";
import ActiveTrip from "./bottomNavigation/ActiveTrip";
import Login from "./Login";
// import Archive from "./bottomNavigation/Archive";
import Archive from "../components/Archive/Archive";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { AuthContext } from "../AuthProvider";

const Bottom = createBottomTabNavigator();


export default function DrawerNavigatorRoutes() {
  const { username } = React.useContext(AuthContext);




  return (
    <Bottom.Navigator
    >
      <Bottom.Screen
       options={{
        tabBarIcon: () => (
          <Image
            source={{
              uri: "/Users/louisayonzon/hackReactor/Blue_Ocean/roadtrip/assets/google-maps-pin-google-maps-pin-google-map-maker-places-5abdbd0c442f58.1359204115223841402793.png",
            }}
            style={{ width: 30, height: 30, borderRadius: 10 }}
          />
        ),
      }}
      name="All Trips" children={() => (<Login /> )} />

      <Bottom.Screen
       options={{
        tabBarIcon: () => (
          <Image
            source={{
              uri: "/Users/louisayonzon/hackReactor/Blue_Ocean/roadtrip/assets/car.png",
            }}
            style={{ width: 30, height: 30, borderRadius: 10 }}
          />
        ),
      }}
      name="Active Trip"children={() => (<ActiveTrip /> )} />

      <Bottom.Screen
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: "/Users/louisayonzon/hackReactor/Blue_Ocean/roadtrip/assets/archive_icon.png",
              }}
              style={{ width: 30, height: 30, borderRadius: 10 }}
            />
          ),
        }}
      name="Archive" children={() => (<Archive /> )} />

    </Bottom.Navigator>

  )

}

// options={{ headerTransparent: true}}
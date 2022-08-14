import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import Sample from "../Sample";
import Sample2 from "../Sample2";

const Stack = createStackNavigator();

export default function AllTrips() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Sample"  children={() => ( <Sample /> )}  />
      <Stack.Screen name="Sample2"  children={() => ( <Sample2 /> )}  />

    </Stack.Navigator>


  )
}
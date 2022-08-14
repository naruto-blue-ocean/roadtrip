import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Archive() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>All Archive items go here!</Text>
    </View>
  )
}
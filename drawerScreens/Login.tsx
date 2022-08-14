import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; //Need to import this
import DrawerNavigatorRoutes from "./DrawerNavigatorRoutes";

export default function Login() {
  const navigation = useNavigation();
  //main navigation will have the login (authentication porttion) as well as the bottom containers attached

  //MAIN


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Pressable
    onPress={() => {navigation.navigate("DrawerNavigatorRoutes")}}>
    <Text>This is the Login Screen</Text>
    </Pressable>

  </View>
  )
}
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"; //Need to import this


export default function Sample ( ) {

  const navigation = useNavigation(); //need to have this in order to move from different files

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
      onPress={() => {navigation.navigate("Sample2")}}>
      <Text>This is a stack</Text>
      </Pressable>

    </View>
  )
}
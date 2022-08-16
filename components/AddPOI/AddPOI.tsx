import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPOIHome from './AddPOIHome';

export default function AddPOI() {
  //update the city to props after connected with "Trip Viewer"
  const city = 'sunnyvale';
  return (
    <Navigator />
  );
}
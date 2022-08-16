import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function POICard() {
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    console.log(e);
    setInput(e);
  }
  const handleSubmit = () => {
    console.log('Submit!');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Search here'}
        keyboardType="web-search"
        // returnKeyType={'search'}
        onChangeText={(e) => handleInputChange(e)}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="black"
      ></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  input: {
    width: 300,
    alignContent: 'flex-start',
    backgroundColor: "#BCABA7",
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 20,
  },
});

import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, SafeAreaView, Button } from 'react-native';

export default function POICard({ city, navigation }) {
  // replace later with lat, lng provided from props
  const latitude = 37.3688;
  const longitude = 121.0365;

  const [input, setInput] = useState<string>('');

  const [suggestion, setSuggestion] = useState([]);
  const handleInputChange = (e: string) => {
    console.log(e);
    setInput(e);
    axios.get('https://api.yelp.com/v3/autocomplete', {
      headers: {
        Authorization: config.YELPTOKEN,
      },
      params: {
        text: e,
        latitude,
        longitude,
      },
    })
      .then((result) => {
        console.log('Yelp Autocomplete success!, result.data = ', result.data.categories);
        if (result.data.categories.length === 0) {
          setSuggestion(result.data.categories);
        }
      })
      .catch((err) => {
        console.log('Yelp GET failed, err = ', err);
      })
  }
  const handleSubmit = () => {
    console.log('Submit!');
    navigation.navigate('POIList', {
      city: city,
      term: input,
    })
  }
  return (
    <View>
      <TextInput
      style={styles.input}
      placeholder={'Search here'}
      keyboardType="web-search"
      returnKeyType="send"
      onChangeText={(e) => handleInputChange(e)}
      onSubmitEditing={handleSubmit}
      placeholderTextColor="black"
      ></TextInput>
      <FlatList />
    </View>

);
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    textAlign: 'left',
    backgroundColor: '#eee',
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 20,
  },
});

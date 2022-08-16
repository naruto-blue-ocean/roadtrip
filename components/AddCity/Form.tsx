import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNGooglePlaces from 'react-native-google-places-api';


export default function Form () {

  var [list, setList] = useState<string[]>([]);

  return (
    <View style = {styles.container}>
     <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // main_text is the city name, place_id is the city id
        console.log('-----flagged', data.structured_formatting.main_text, data.place_id)
        setList([...list, data.structured_formatting.main_text]);
      }}
      styles = {{ textInput: styles.textInput }}
      query={{
        key: config.GOOGLE_MAPS_API,
        language: 'en',
      }}
      />
      <Text> {list} </Text>
      <Button title='Submit'/>
    </View>
  )
};

var styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%'
  },

  textInput: {
    height: 50,
    backgroundColor: '#eee',
    marginVertical: 5
  }
})
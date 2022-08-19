import React, { useState, useRef, useEffect } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import City from './City';
import { getZipCode } from 'use-places-autocomplete';

export default function Form ( {list, setList, trip_id, lastIndex}:
  {list: any, setList: any, trip_id: number, lastIndex: number}) {

  console.log('what ar thsee nums', trip_id, lastIndex)

  const [location, setLocation] = useState('');

  return (
    <View style = {styles.container}>

      {/* Auto Complete Field */}
     <GooglePlacesAutocomplete
      placeholder='Search'
      textInputProps= {{
        value : {location},
        onChangeText : (text) => {
          setLocation('')
        }
      }}
      enablePoweredByContainer = {false}
      onPress={(data, details = null) => {
        // main_text is the city name, place_id is the city id
        // console.log('yeees this is data', details)
        // console.log('-----flagged', data.structured_formatting.main_text, data.place_id)
        var cityInfo = {
          name: data.structured_formatting.main_text,
          id: data.place_id,
          lat: details?.geometry.location.lat,
          lng: details?.geometry.location.lng,
          trip_id: trip_id,
          lastIndex: lastIndex
        }
        console.log('what is cityiNof', cityInfo)
        setList([...list, cityInfo])
        setLocation('')
        console.log('what is location', location)
      }}
      styles = {{ textInput: styles.textInput, zIndex: 20 }}
      query={{
        key: config.GOOGLE_MAPS_API,
        language: 'en',
      }}
      fetchDetails = {true}
      />

      {/* List of Cities */}

    </View>
  )
};

var styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '80%',
    zIndex: 1
  },

  textInput: {
    height: 50,
    backgroundColor: '#eee',
    marginVertical: 5,
  }
})
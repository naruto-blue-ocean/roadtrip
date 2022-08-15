import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import City from './City';

export default function Form ( {list, setList, post}: {list:any, setList: any, post: any}) {

  const handlePost = (e: any) => {
    e.preventDefault();
    post(list)
  };

  return (
    <View style = {styles.container}>

     <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // main_text is the city name, place_id is the city id
        console.log('-----flagged', data.structured_formatting.main_text, data.place_id)
        var cityInfo = {name: data.structured_formatting.main_text, id: data.place_id}
        setList([...list, cityInfo])
      }}
      styles = {{ textInput: styles.textInput }}
      query={{
        key: config.GOOGLE_MAPS_API,
        language: 'en',
      }}
      />

      {list.map((city: any) => {
          console.log('what is list', list, 'and what is city', city)
        return (
          <City key={city.id} cityInfo= {city} />
        )
      })}

    </View>
  )
};

var styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '80%'
  },

  textInput: {
    height: 50,
    backgroundColor: '#eee',
    marginVertical: 5
  }
})
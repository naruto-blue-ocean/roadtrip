import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useLoadScript } from '@react-google-maps/api';
import config from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNGooglePlaces from 'react-native-google-places-api';


export default function Form () {

  // const [libraries, setLibraries] = useState<string[]>(['places']);

  // loads the Google Map API
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: config.GOOGLE_MAPS_API,
  //   language: 'en',
  //   libraries: ['places']
  // });

  // if the GooGle Maps API is not present, this loading text will render
  // if (!isLoaded) {
  //   return (
  //     <View>
  //       <Text> Loading </Text>
  //     </View>
  //   )
  // }

  var [list, setList] = useState([]);

  // creates an OpenSearchModal
  var OpenSearchModal = async () => {
    var places = await RNGooglePlaces.openAutocompleteModal();
    try {console.log('what are results', places)}
    catch(err) {console.log('Err in getting places data', err)};
  }

  return (
    <View style = {styles.container}
    >
     <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('what is data',data, details);
      }}
      styles = {{ textInput: styles.textInput }}
      query={{
        key: config.GOOGLE_MAPS_API,
        language: 'en',
      }}
      />
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
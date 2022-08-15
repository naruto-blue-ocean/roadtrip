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

  // creates an OpenSearchModal
  var OpenSearchModal = async () => {
    var places = await RNGooglePlaces.openAutocompleteModal();
    try {console.log('what are results', places)}
    catch(err) {console.log('Err in getting places data', err)};
  }

  return (
    <View >
     <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('what is data',data, details);
      }}
      query={{
        key: config.GOOGLE_MAPS_API,
        language: 'en',
      }}
      />
      <Button onPress = {() => OpenSearchModal} title='Submit'/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
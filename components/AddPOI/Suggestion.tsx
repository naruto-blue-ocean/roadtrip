import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import config from '../../config';
export default function Suggestion({ city }) {
  const handlePress = (term: string) => {
    console.log('Pressed term = ', term);
    axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: config.YELPTOKEN,
      },
      params: {
        term,
        location: city,
      },
    })
      .then((result) => {
        console.log('Yelp GET success!');
      })
      .catch((err) => {
        console.log('Yelp GET failed, err = ', err);
      })
  }
  return (
    <View style={styles.container}>
      <Button title="Attractions" onPress={() => handlePress('attraction')} ></Button>
      <Button title="Restaurants" onPress={() => handlePress('restaurant')} ></Button>
      <Button title="Gas" onPress={() => handlePress('gas')} ></Button>
      <Button title="Coffee" onPress={() => handlePress('coffee')} ></Button>
      <Button title="Hotels" onPress={() => handlePress('hotel')} ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

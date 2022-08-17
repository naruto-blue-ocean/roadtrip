import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, Button } from 'react-native';
import POICard from './POICard';

export default function POIList({ navigation, route }) {
  const { city, term } = route.params;
  const [POIs, setPOIs] = useState([]);
  useEffect(() => {
    console.log('In POIList, city = ', city);
    console.log('In POIList, term = ', term);
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
        setPOIs(result.data.businesses);
      })
      .catch((err) => {
        console.log('Yelp GET failed, err = ', err);
      })
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {/* {POIs && POIs.map((POI) => <POICard POI={POI} />)} */}
      {POIs && <FlatList
        data={POIs}
        renderItem={({ item }) => (<POICard POI={item} />)}
        keyExtractor={(item) => item.id} />}
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
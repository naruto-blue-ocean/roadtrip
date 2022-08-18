import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery } from 'react-query';
import axios from 'axios';
import config from '../../config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, Button } from 'react-native';
import List from './List';
import POICard from './POICard';

const getPOIs = require('./yelpAPI');
const queryClient = new QueryClient();


export default function POIList({ navigation, route }) {

  const { city, term } = route.params;
  const [POIs, setPOIs] = useState([]);

  var { isLoading: getPOIsIsLoading, data: getPOIsData } = useQuery('getPOIs', getPOIs(city, term));

  var { isLoading: getPOIsLoading, data: getPOIsData } = useInfiniteQuery('getPOIs', getPOIs(city, term));

  // useEffect(() => {
  //   console.log('In POIList, city = ', city);
  //   console.log('In POIList, term = ', term);
  //   axios.get('https://api.yelp.com/v3/businesses/search', {
  //     headers: {
  //       Authorization: config.YELPTOKEN,
  //     },
  //     params: {
  //       term,
  //       location: city,
  //     },
  //   })
  //     .then((result) => {
  //       console.log('Yelp GET success!');
  //       setPOIs(result.data.businesses);
  //     })
  //     .catch((err) => {
  //       console.log('Yelp GET failed, err = ', err);
  //     })
  // }, []);

  // const loadMore = () => {
  //   alert('load more');
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container} >
        <Button title="Go back" onPress={() => navigation.goBack()} />
        {/* {POIs && <FlatList
          data={POIs}
          renderItem={({ item }) => (<POICard POI={item} />)}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
        />} */}
        <List city={city} term={term} />
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
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
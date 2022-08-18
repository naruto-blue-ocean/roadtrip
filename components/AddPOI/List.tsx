import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery } from 'react-query';
import axios from 'axios';
// import config from '../../config';
import { StyleSheet, View, FlatList, Text, Button } from 'react-native';
import POICard from './POICard';

const getPOIs = require('./yelpAPI');
// const queryClient = new QueryClient();


export default function List({ city, term }) {

  // const { city, term } = route.params;
  // const [POIs, setPOIs] = useState([]);

  const { isLoading: getPOIsIsLoading, data: getPOIsData } = useQuery('getPOIs', getPOIs(city, term));

  // const { isLoading: getPOIsLoading, data: getPOIsData } = useInfiniteQuery('getPOIs', getPOIs(city, term));

  const loadMore = () => {
    alert('load more');
  };

  return (
    <View>
      {/* {console.log('In List!')}
      {getPOIsData && <FlatList
        data={getPOIsData}
        renderItem={({ item }) => (<POICard POI={item} />)}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
      />} */}
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
})
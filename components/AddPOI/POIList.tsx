import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import axios from 'axios';
// import config from '../../config';
// import Arrow from 'react-native-vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, Button, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import POICard from './POICard';

const getPOIs = require('./yelpAPI');

export default function POIList({ order, desID, tripID }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { city, term } = route.params;

  const { isLoading: getPOIsLoading, data: getPOIsData } = useQuery('getPOIs', () => getPOIs(city, term));
  // console.log('useQuery, getPOIsData = ', getPOIsData)

  // const { isLoading: getPOIsLoading, data: getPOIsData } = useInfiniteQuery('getPOIs', getPOIs(city, term), {
  // });
  //console.log('infiniteQuery, getPOIsData.pages = ', getPOIsData)

  // const [POIs, setPOIs] = useState([]);
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

  const loadMore = () => {
    alert('load more');
  };

  return (
    <View style={styles.container} >
      {/* <Pressable style={styles.container} onPress={() => navigation.goBack()}>
        <Arrow style={styles.backIcon} name="arrowleft" size={20} color="#000"/>
      </Pressable> */}
      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
      {/* {POIs && <FlatList
        data={POIs}
        renderItem={({ item }) => (<POICard
          POI={item}
          order={order}
          navigation={navigation}
        />)}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
      />} */}
      {!getPOIsLoading && <FlatList
        data={getPOIsData}
        renderItem={({ item }) => (
          <POICard
            POI={item}
            desID={desID}
            order={order}
            tripID ={tripID}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
      />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  backIcon: {

  },
});
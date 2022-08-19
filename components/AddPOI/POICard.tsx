import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';

export default function POICard({ POI, desID, order, tripID }) {

  const navigation = useNavigation();

  const handlePress = () => {
    axios.post(`${config.LOCALTUNNEL}/addPOI`, {
      POIname: POI.name,
      desID,
      tripID,
      POIID: POI.id,
      order: (order + 1),
    })
      .then((result) => {
        // console.log('POST addPOI success!')
      })
      .catch((err) => console.log('POST addPOI err!, err = ', err))
    navigation.navigate('DestinationViewer', {
      tripId: tripID
    });
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Image style={styles.tinyLogo} source={{uri: POI.image_url}}/>
        <Text>{POI.name}</Text>
        <Text>{POI.rating}</Text>
        <Text>{POI.categories[0].title}</Text>
      </Pressable>
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
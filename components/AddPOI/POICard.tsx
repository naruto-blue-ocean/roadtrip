import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';

export default function POICard({ navigation, POI, id }) {

// const handlePress = (e) => {
//   axios.post(`${config.LOCALTUNNEL}/addPOI`, {
//     name: POI.name,
//     id: POI.id,
//   })
//     .then((result) => console.log('POST addPOI success!'))
//     .catch((err) => console.log('POST addPOI err!, err = ', err))
//   navigation.navigate('DestinationViewer');
// };

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
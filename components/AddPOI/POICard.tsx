import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        navigation.navigate('DestinationViewer', {
          tripId: tripID
        });
      })
      .catch((err) => console.log('POST addPOI err!, err = ', err))
  };



  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image style={styles.tinyLogo} source={{uri: POI.image_url}}/>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{POI.name}</Text>
          {/* <Text>{POI.rating}</Text> */}
          <Stars
            default={POI.rating}
            count={5}
            half={true}
            fullStar={<Icon name={'star'} style={[styles.star]}/>}
            emptyStar={<Icon name={'star-outline'} style={styles.star}/>}
            halfStar={<Icon name={'star-half'} style={[styles.star]}/>}
          />
          <Text>{POI.categories[0].title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    height: 100,
    borderWidth: 2,
    borderRadius: 30,
    padding: 20,
    marginVertical: 15,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: 'column',

  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  star: {
    color: "#f9a920",
    backgroundColor: 'transparent',
    fontSize: 28,
    textShadowColor: '#f9a920',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.2,
  },
});
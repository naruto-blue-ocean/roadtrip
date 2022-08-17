import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function POICard({ POI }) {

const handlePress = (e) => {

};

  return (
    <View>
      <Image style={styles.tinyLogo} source={{uri: POI.image_url}}/>
      <Text>{POI.name}</Text>
      <Text>{POI.rating}</Text>
      <Text>{POI.categories[0].title}</Text>
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
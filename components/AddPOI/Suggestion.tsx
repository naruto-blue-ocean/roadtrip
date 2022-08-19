import React from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Plus from 'react-native-vector-icons/Feather';

export default function Suggestion({ city }) {
  const navigation = useNavigation();
  const handlePress = (term: string) => {
    // console.log('In Suggestion, Pressed term = ', term);
    // console.log('In Suggestion, city = ', city);

    navigation.navigate('POIList', {
      city: city,
      term: term,
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress('attraction')} >
        <Text style={styles.text} >Attractions</Text>
        <Plus style={styles.plusIcon} name="plus" size={20} color="#000"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress('Restaurants')} >
        <Text style={styles.text}>Restaurants</Text>
        <Plus style={styles.plusIcon} name="plus" size={20} color="#000"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress('Gas')} >
        <Text style={styles.text}>Gas</Text>
        <Plus style={styles.plusIcon} name="plus" size={20} color="#000"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress('Coffee')} >
        <Text style={styles.text}>Coffee</Text>
        <Plus style={styles.plusIcon} name="plus" size={20} color="#000"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress('Hotels')} >
        <Text style={styles.text}>Hotels</Text>
        <Plus style={styles.plusIcon} name="plus" size={20} color="#000"/>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: 250,
    height: 70,
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    backgroundColor: '#B0C4B1',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  plusIcon: {
    color: 'white',
  }
});

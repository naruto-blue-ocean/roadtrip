import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Pressable, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { getItemAsync } from 'expo-secure-store';

export default function POICard({ navigation, city, lat, lng }) {

  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e: string) => {
    // console.log(e);
    setInput(e);
    axios.get('https://api.yelp.com/v3/autocomplete', {
      headers: {
        Authorization: config.YELPTOKEN,
      },
      params: {
        text: e,
        latitude: lat,
        longitude: lng,
      },
    })
      .then((result) => {
        // console.log('Yelp Autocomplete success!, result.data = ', result.data.categories);
        if (result.data.categories.length > 0) {
          setSuggestions(result.data.categories);
        }
      })
      .catch((err) => {
        // console.log('Yelp GET failed, err = ', err);
      })
  }
  const handleSubmit = (selected: string) => {
    const term = selected || input
    // console.log('Submit!');
    navigation.navigate('POIList', {
      city,
      term,
    })
  }
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Search here'}
        keyboardType="web-search"
        returnKeyType="send"
        onChangeText={(e) => handleInputChange(e)}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="black"
      />
      {input && <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSubmit(item.alias)}>
            <Text>{item.alias}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.alias}
      />}
    </View>

);
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    textAlign: 'left',
    backgroundColor: '#eee',
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 20,
  },
});

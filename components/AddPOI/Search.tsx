import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import Search from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Pressable, Text, TextInput, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getItemAsync } from 'expo-secure-store';

export default function POICard({ city, lat, lng }) {

  const navigation = useNavigation();
  const [click, setClick] = useState()
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
      <View style={styles.searchBar}>
        <Search style={styles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          style={styles.input}
          placeholder={'Search here'}
          keyboardType="web-search"
          onChangeText={(e) => handleInputChange(e)}
          onSubmitEditing={handleSubmit}
          placeholderTextColor="lightgrey"
        />
      </View>
      {input && <FlatList
        style={styles.suggestionContainer}
        data={suggestions}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSubmit(item.alias)}>
            <Text style={styles.suggestionText}>{item.alias}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.alias}
      />}
    </View>

);
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 285,
    height: 40,
    textAlign: 'left',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30,
    fontSize: 30,
  },
  searchIcon: {
    paddingRight: 10,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
    fontSize: 15,
    fontWeight: '500',
  },
  suggestionContainer: {
    marginLeft: 45,
    fontSize: 50,
  },
  suggestionText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  }
});

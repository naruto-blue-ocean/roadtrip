import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import config from '../../config.js';
import axios from 'axios';
import Form from './Form';
import City from './City';
import ShareButton from './ShareButton';

export default function AddCity () {

  var [list, setList] = useState<{name: string, id: string}[]>([]);

  var post = () => {
    // sends an array of objects to back end, must deconstruct and store each
    // individual city server side
    axios.post(`${config.LOCALTUNNEL}/postCities`, list)
    .then(() => {console.log('success posting from front end')})
    .catch((err) => {console.log('Err in posting from front end', err)})
  };

  return (
    <View style= {styles.container}>
      <Form
        list = {list}
        setList = {setList}
        />
    <View style={styles.cityContainer}>
      {list.map((city: any) => {
          console.log('what is list', list, 'and what is city', city)
        return (
          <City key={city.id} cityInfo= {city} />
        )
      })}
    </View>
      <Button
      onPress={post}
      title='Submit'/>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    alignContent: 'center',
  },

  cityContainer : {
    position: 'relative',
    zIndex: 0,
    bottom: 490,
    width: 200,
    left: 80
  }
})


// given an object, for each

import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import Form from './Form';
import City from './City';

export default function AddCity () {

  var [list, setList] = useState<{name: string, id: string}[]>([]);

  var post = async (body: any) => {
    console.log('whati s body', list)
    // sends an array of objects to back end, must deconstruct and store each
    // individual city server side
    var results = await axios.post('/url', body);
    try {console.log('Success in posting data from client side')}
    catch(err) {console.log('Error in posting cities from client side', err)}
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

import React, { useState } from 'react';
import {Text, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import Form from './Form'

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
    <View>
      <Form
        list = {list}
        setList = {setList}
        />
      <Button
      onPress={post}
      title='Submit'/>
    </View>
  );
};
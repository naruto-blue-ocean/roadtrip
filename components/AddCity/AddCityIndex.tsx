import React from 'react';
import {Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import Form from './Form';

export default function AddCity () {

  return (
    <View>
      <Form />
      <Text> Mapped Cities </Text>
      <Button title='Submit'/>
    </View>
  )
};
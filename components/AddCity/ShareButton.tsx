import React from 'react';
import {Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import Form from './Form';
import config from '../../config';
import { AuthContext } from '../../AuthProvider.js';

export default function ShareButton () {
  const { username } = React.useContext(AuthContext);

  const handleShare = () => {
    // console.log('test')
    axios.post('http://127.0.0.1:3000/share', {email: username})
      .then( (response) => {
        console.log(response.data)
      })
      .catch( (err) => {
        console.log(err)
      })
  }
  return (
    <View>
      <Button title='ShareButton'
        onPress={handleShare}/>
    </View>
  )
};
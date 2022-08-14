import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, Image } from 'react-native';
import axios from 'axios';
import config from '../config.js';


class PoiViewer extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    data: '',
  }

 }

 componentDidMount() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${config.YELPTOKEN}`;
  let poiname = 'north-india-restaurant-san-francisco';
  //can use ID instead
  axios.get(`https://api.yelp.com/v3/businesses/${poiname}`).then((data) => {
    console.log(data.data);
    this.setState({data:data.data});
  })
 }

 render() {
  return (
    <View>
      <Text>Hello, I am the POI viewer page</Text>
      {/* <Text>This is the data {JSON.stringify(this.state.data)}</Text> */}
      <Text>{this.state.data.name}</Text>
      <Image source={{uri: 'https://s3-media1.fl.yelpcdn.com/bphoto/_nJ2VTeTZe5-gePr8PXTxg/o.jpg'}}
       style={{width: 200, height: 200}} />
       <Text>Phone: {this.state.data.display_phone}</Text>
      <Text>Stars: {this.state.data.rating}</Text>

    <StatusBar style="auto" />
  </View>
  )
 }
}



export default PoiViewer;
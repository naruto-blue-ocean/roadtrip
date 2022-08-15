import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, TextInput, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import axios from 'axios';
import config from '../../config.js';

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
    // console.log(data.data);
    this.setState({data:data.data});
  })
 }

 render() {
  // console.log("DIMESIONS HEIGHT: ",  Dimensions.get('window').height)
  // console.log("DIMESIONS WIDTH: ",  Dimensions.get('window').width)
  console.log("WHAT IS THE ADDRESS: ", this.state.data.location?.display_address)
  return (
    <ScrollView>
    <View style={styles.wrapper}>
      {/* Picture */}
      {/* <Pressable onPress={()=>{Keyboard.dismiss()}}
      > */}
      {/* <View style={styles.menuBox}> */}
      <Image source={{uri: `${this.state.data.image_url}`}}
       style={styles.image} />
      {/* </View> */}
      <TextInput style={styles.note}
         placeholder="note"
         multiline={true}
         numberOfLines={5} />

      {/* </Pressable> */}

      <Pressable onPress={()=>{Keyboard.dismiss()}}
      >

      <Text style={styles.title}>{this.state.data.name}</Text>
      <View style={styles.starRating}>
        <Text>Stars go here</Text>
        <View style={styles.categories}>
          {this.state.data?.categories?.map((category, index) => {
          return(<Text key={index}>{category.title}{index === this.state.data.categories.length - 1 ? '' : ',' }</Text>)
        })}
        </View>
      </View>
      <Text>{this.state.data.price}</Text>
      <Text>{this.state.data.location?.display_address[0]} {this.state.data.location?.display_address[1]}</Text>
      {/* Restaurant Info */}
      <Text>Stars: {this.state.data.rating}</Text>
      <Text>Phone: {this.state.data.display_phone}</Text>
    <StatusBar style="auto" />
    </Pressable>

  </View>
  </ScrollView>
  )
 }
}

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    flexDirection: 'row',
  },
  note: {
    flex: .75,
    textAlign: 'center',
    borderWidth: 1,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    padding: 20,
  },
  body: {

  },
  image: {
    // flex: 1,
    // flexDirection: 'row',
    height: "100%",
    // alignSelf: 'stretch',
    width: "100%",

  },
  starRating: {
    // flex: 0.06,
    flexDirection: 'column',
  },
  menuBox: {
    // flex: 1,
    // backgroundColor: "#DCDCDC",
    width: "100%",
    height: "50%",
    padding: 0,
    // margin: 0,
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: "black",

  }

});

export default PoiViewer;
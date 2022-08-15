import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, TextInput, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import axios from 'axios';
import config from '../../config.js';
import Edit from './Edit.tsx';

class PoiViewer extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    data: '',
    showModal: false
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


 displayModal() {
  // console.log("WE WENT IN THIS FUNCTIon")
  this.setState({showModal: !this.state.showModal})

 }

 render() {
  // console.log("DIMESIONS HEIGHT: ",  Dimensions.get('window').height)
  // console.log("DIMESIONS WIDTH: ",  Dimensions.get('window').width)
  // console.log("WHAT IS THE ADDRESS: ", this.state.data.location?.display_address)
  return (
    <ScrollView>
      <Image source={{uri: `${this.state.data.image_url}`}}
       style={styles.image} />
    <View style={styles.wrapper}>
      {/* <Pressable onPress={()=>{Keyboard.dismiss()}}
      > */}
      {/* <View style={styles.menuBox}> */}

      {/* </View> */}
      {/* <Pressable onPress={()=>{Keyboard.dismiss()}}> */}

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

      <View style={styles.note} >
      <Text>the users note will go here</Text>
         <Pressable
         onPress={this.displayModal.bind(this)}
         >
          <Text style={styles.editButton}>Edit</Text>
         </Pressable>
         <Edit showModal={this.state.showModal} displayModal={this.displayModal.bind(this)} title={this.state.data.name}/>

      </View>

    <StatusBar style="auto" />
    {/* </Pressable> */}

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
    // flex: .75,
    textAlign: 'center',
    borderWidth: 1,
    height: "30%",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  wrapper: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    margin: 5,
    marginBottom: 25,
    fontSize: 20,
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

  },
  editButton: {
    alignSelf: "flex-end"
  }

});

export default PoiViewer;
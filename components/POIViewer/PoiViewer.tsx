import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, TextInput, Pressable, TouchableHighlight, ScrollView, NativeModules } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config.js';
import Edit from './Edit.tsx';
import styled from 'react-native-styled-components';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class PoiViewer extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    data: '',
    note: '',
    showModal: false,
    noteRendered: false
  }
 }

 componentDidMount() {
  axios.defaults.headers.common['Authorization'] = config.YELPTOKEN;
  //computer history as a backup
  let poiname = this.props.route?.params.params.poi_id || 'Z6gkivXc4B_eG5oj4OgaxQ'
  let userid = this.props.route?.params.params.email || 'johnny@email.com';
  //can use ID instead
  axios.get(`https://api.yelp.com/v3/businesses/${poiname}`).then((data) => {
 // DO A GET REQUEST TO THE DATABASE TO RETRIEVE THE NOTES
    this.setState({
      data:data.data,
    });
  })
  //USING LOCAL TUNNEL TO GET THE CONNECTION TO THE DB
  axios.get(`${config.LOCALTUNNEL}/notes/${userid}/${poiname}`).then((data) => {
    if (data.data) {
      this.setState({note:data.data?.content,
        noteRendered: true
      })
    } else {
      this.setState({
        noteRendered: true
      })
    }
  }).catch((err) => {
    console.log('err at getting notes in poi viewer', err.response)
  })
 }


 displayModal() {
  // console.log("WE WENT IN THIS FUNCTIon")
  this.setState({showModal: !this.state.showModal})

 }

 updateNote(value: String) {
  let poiname = this.props.route?.params.params.poi_id || 'Z6gkivXc4B_eG5oj4OgaxQ'
  let userid = this.props.route?.params.params.email || 'johnny@email.com';
  //data we will send over to the server
  var data = {
    note: value,
    user_email: userid,
    poi_id: poiname
  }

  console.log("WHAT IS THE NEW VALUE: ", value)
  axios.put(`${config.LOCALTUNNEL}/updateNote`, data)
  .then((data) => {
    console.log("POST WAS SUCCESS", data.data)
    this.setState({
      //where were will update the new note
      note: value
    })
  })
  .catch((err) => {
    console.log("err when updating the new note", err)
  })

 }

 render() {
  const {route} = this.props;
  // console.log('props in poi viewer',this.props)
  // console.log('poiviewer route', route.params)
  // console.log("DIMESIONS HEIGHT: ",  Dimensions.get('window').height)
  // console.log("DIMESIONS WIDTH: ",  Dimensions.get('window').width)
  // console.log("WHAT IS THE ADDRESS: ", this.state.data.location?.display_address)
  // var name = this.state.data.price
  // console.log("DOLLAR DOLLAR BILLS: ", name.length)
  // console.log("DOLLAR DOLLAR BILLSasjkasd: ", )
  // if (this.state.noteRendered) {
  //  var modal = <Edit updateNote={this.updateNote.bind(this)} showModal={this.state.showModal} displayModal={this.displayModal.bind(this)} title={this.state.data.name} note={this.state.note}/>
  // }
  var isOpen;
  var price;
  if (this.state.data) {
    // console.log("WHAT IS THE hours ------------------:", this.state.data?.price)
    isOpen = this.state.data?.hours[0].is_open_now
    price = this.state.data?.price
  }
  return (
    <ScrollView>
      {this.state.data.image_url ? <Image source={{uri: `${this.state.data?.image_url}`}}
       style={styles.image} /> : ''}
    <View style={styles.wrapper}>
      {/* <Pressable onPress={()=>{Keyboard.dismiss()}}
      > */}
      {/* <View style={styles.menuBox}> */}

      {/* </View> */}
      {/* <Pressable onPress={()=>{Keyboard.dismiss()}}> */}

      <Text style={styles.title}>{this.state.data.name}</Text>
      <View style={styles.starRating}>

        <View style={{alignItems:'left', flex: 1, flexDirection: 'row'}}>
          <Stars
            default={this.state.data.rating}
            count={5}
            half={true}
            fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
            emptyStar={<Icon name={'star-outline'} style={styles.myStarStyle}/>}
            halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
          />
           <Text style={{paddingLeft: 5 ,marginTop: 5, fontSize: 16}}>{this.state.data.review_count} Reviews</Text>
      </View>



        <View style={styles.categories}>
        {price && <Text style={{paddingRight: 10, fontSize: 15}}>{price} · </Text>}
        {this.state.data?.price === undefined && <Text style={{paddingRight: 10, fontSize: 15}}>$ ·</Text>}
        {this.state.data?.categories?.map((category, index) => {
          return(<Text key={index}>{category.title}{index === this.state.data.categories.length - 1 ? '' : ', ' }</Text>)
        })}
        </View>
      </View>
      {/* <Text>{this.state.data.price}</Text> */}
      <Text style={{marginTop: 5}}>{this.state.data.location?.display_address[0]} {this.state.data.location?.display_address[1]}</Text>
      {/* Restaurant Info */}
      {/* <Text>Stars: {this.state.data.rating}</Text> */}
      <Text>Phone: {this.state.data.display_phone}</Text>
      {isOpen &&  <Text style={{color: 'green', marginVertical: 5}}>Open</Text>}
      {!isOpen &&  <Text style={{color: 'red'}}>Open</Text>}


      <View style={styles.note} >
      <Text>{this.state.note || 'Add a note here...'}</Text>
         <Pressable
         onPress={this.displayModal.bind(this)}
         >
          <Text style={styles.editButton}>Edit</Text>
         </Pressable>
 {this.state.noteRendered && <Edit updateNote={this.updateNote.bind(this)} showModal={this.state.showModal} displayModal={this.displayModal.bind(this)} title={this.state.data.name} note={this.state.note}/>}

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
    marginTop: 5,
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
  outerStar:{
    flex: 1,
    flexDirection: 'row',
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
  },
  myStarStyle: {
    color: "white",
    backgroundColor: 'red',
    fontSize: 28,
    textShadowColor: '#f9a920',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.2,
    marginHorizontal: 2,
    borderRadius: 15,
  },


});

export default function(props) {
  const route = useRoute();
  return <PoiViewer {...props} route={route}/>
}
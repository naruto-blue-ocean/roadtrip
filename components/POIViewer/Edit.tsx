import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, TextInput, Pressable, Modal, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import config from '../../config.js';

export default function Edit({showModal, displayModal, title}) {

  const [showPost, setShowPost] = useState(false)


  return (

    <View>
      <Modal animationType="slide" visible={showModal}>
        <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {/* <View > */}
        <Pressable
      onPress={displayModal}>
        <View style={styles.hide}>
        <Text>HIDE</Text>
        </View>
      </Pressable>

        {/* </View> */}
        </View>

        <View>
        <ScrollView style={styles.scrollNote}>
        <TextInput
        style={styles.note}
         placeholder="This is where you will display your notes. This is a really good place where you can jot down your notes and have it saved forever"
         multiline={true}
         numberOfLines={5}
        />
        </ScrollView>

        </View>

        <View style={styles.postBox}>
          <Text style={styles.post}>POST</Text>
        </View>



      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: 20,
  },
  hide: {
  padding: 5,
  // borderWidth: 1,
  },

  scrollNote: {
    // flex: 1,
    // borderWidth: 1,
    height: "43%"
  },
  note: {
    // borderWidth: 1,
    height: "500%",
    width: "100%",
    marginVertical: 0,
    padding: 20,
  },
  postBox: {
    margin: 10
  },
  post: {
    textAlign: 'right'
  }
})
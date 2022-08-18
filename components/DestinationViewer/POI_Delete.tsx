import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable, LayoutAnimation} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const POI_Delete = (props) => {
  return (
    <View>
  <Pressable
    onPressIn={ () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }}
    style={styles.minusicon}
  >
    <FontAwesome name="minus-circle" size={36} color="white" />
  </Pressable>
  </View>)

}

const styles = StyleSheet.create({
  minusicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default POI_Delete;
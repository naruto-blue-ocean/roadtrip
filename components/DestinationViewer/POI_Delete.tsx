import React from 'react';
import {View, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
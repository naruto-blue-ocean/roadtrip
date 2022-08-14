import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function DestinationViewer() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
      <View style={styles.body}>
        <Text>Binh</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    flex: 1,
    backgroundColor: '#219EBC',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    backgroundColor: '#FB8500',
    alignContent: 'center',
  }
});
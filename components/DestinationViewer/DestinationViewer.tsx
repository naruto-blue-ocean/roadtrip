import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, Animated, PanResponder } from 'react-native';

const destinations = ['San Diego', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']

export default function DestinationViewer() {
  const offset = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      offset.setValue(0);
     },
    onPanResponderMove: Animated.event([null, { dy: offset }], {useNativeDriver: false}),
    onPanResponderRelease: () => { offset.stopAnimation((lastOffset) => { offset.setOffset(lastOffset); }); },
  })).current;


  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
      <View style={styles.body}>
        <Animated.View style={{...styles.item, transform: [{ translateY: offset }]}} {...panResponder.panHandlers}>
          <View />
        </Animated.View>
        <View style={styles.item} />
        <View style={styles.item} />
      </View>
      {/* <ScrollView style={styles.body}>
        {destinations.map((destination) => (<Text key={destination}>{destination}</Text>))}
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
      </ScrollView> */}
      <StatusBar style="auto" />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    backgroundColor: '#FB8500',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item : {
    backgroundColor: 'white',
    height: '20%',
    width: '30%',
    borderColor: 'black',
    borderWidth: 1,
  }
});

import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Pressable } from 'react-native';

export default function Drag({
  destination, cities, setCities, setCurrDrag, setNeighbor
}) {
  const yCoord = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      yCoord.setValue(0);
     },
    onPanResponderMove: Animated.event([null, { dy: yCoord }], {useNativeDriver: false}),
    onPanResponderRelease: () => { yCoord.stopAnimation((lastOffset) => { yCoord.setOffset(lastOffset); }); },
  })).current;

  useEffect(() => {
    yCoord.addListener(({ value }) => {
      const indexDragged = cities.indexOf(destination);
      // console.log(value);
      switch (true) {
        case (indexDragged === cities.length - 1 && value > 0 || indexDragged === 0 && value < 0):
          setNeighbor(destination);
          break;
        case (value > 0):
          setNeighbor(cities[indexDragged + 1]);
          break;
        case (value < 0):
          setNeighbor(cities[indexDragged - 1]);
          break;
      }
    });
  }, [yCoord]);
  // Event listener for Animated Value will provide y-offset values during animation


  return (
      <Animated.View
      // onLayout={event => {
        // const layout = event.nativeEvent.layout;
        // if (destination === 'San Diego') {
        // console.log('height:', layout.height);
        // console.log('width:', layout.width);
        // console.log('x:', layout.x);
        // console.log('y:', layout.y);
        // }
      // }}
      // onLayout approach will provide initial position after elements are painted on the screen
      style={{...styles.item, transform: [{ translateY: yCoord }]}} {...panResponder.panHandlers}>
        <Pressable
        style={styles.pressable}
        onPressIn={() => { setCurrDrag(destination) }}
        // onLongPress={() => {console.log(destination)}}
        >
          <Text>{destination}</Text>
        </Pressable>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  item : {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  pressable : {
    height: 100,
  },
});
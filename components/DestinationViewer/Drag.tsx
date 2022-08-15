import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder } from 'react-native';

export default function Drag({ destination }) {
  const offset = useRef(new Animated.Value(0)).current;
  // const someRef = useRef(null);

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      offset.setValue(0);
     },
    onPanResponderMove: Animated.event([null, { dy: offset }], {useNativeDriver: false}),
    onPanResponderRelease: () => { offset.stopAnimation((lastOffset) => { offset.setOffset(lastOffset); }); },
  })).current;

  useEffect(() => {
    offset.addListener(({ value }) => { console.log(value); });
  }, [offset]);
  // Event listener for Animated Value will provide y-offset values during animation

  return (
      <Animated.View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        if (destination === 'Los Angeles') {
          console.log('height:', layout.height);
        console.log('width:', layout.width);
        console.log('x:', layout.x);
        console.log('y:', layout.y);
        }
      }}
      // onLayout approach will provide initial position after elements are painted on the screen
      style={{...styles.item, transform: [{ translateY: offset }]}} {...panResponder.panHandlers}>
        <Text>{destination}</Text>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  item : {
    backgroundColor: 'white',
    height: '20%',
    width: '30%',
    borderColor: 'black',
    borderWidth: 1,
  }
});
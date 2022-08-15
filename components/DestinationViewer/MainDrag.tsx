import React, { useRef } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';

export default function MainDrag() {
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
    <Animated.View style={{...styles.item, transform: [{ translateY: offset }]}} {...panResponder.panHandlers}>
      <View />
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
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Pressable } from 'react-native';

export default function Drag({
  destination, cities, setCities, setCurrDrag, setNeighbor, currDrag,
  // neighbor,
  setYDistributions, yDistributions,
  yDistributionsArr, indexDragged, setIndexDragged, setYDragged, yDragged
}) {
  const [initialY, setInitialY] = useState(0);

  const yCoord = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      yCoord.setValue(0);
      setCurrDrag(destination);
      setIndexDragged(cities.indexOf(destination));
     },
    onPanResponderMove: Animated.event([null, { dy: yCoord }], {useNativeDriver: false}),
    onPanResponderRelease: () => { yCoord.stopAnimation((lastOffset) => { yCoord.setOffset(lastOffset); }); },
  })).current;

  useEffect(() => {
    console.log(cities);
    console.log(currDrag);
    yCoord.addListener(({ value }) => {
      setYDragged(value);
    });
  }, [yCoord, yDistributionsArr]);
  // Event listener for Animated Value will provide y-offset values during animation

  useEffect(() => {
    if (yDistributionsArr.length > 0) {
      let copyOfCities = cities.slice();
      let neighbor;
      switch (true) {
        case (indexDragged === 0 && yDragged < 0 || indexDragged === cities.length - 1 && yDragged > 0):
          break;
        case (yDragged > 0 && currDrag && (yDragged - yDistributionsArr[indexDragged]) >
          (yDistributionsArr[indexDragged + 1] - yDistributionsArr[indexDragged])):
          neighbor = cities[indexDragged + 1];
          copyOfCities[indexDragged] = neighbor;
          copyOfCities[indexDragged + 1] = currDrag;
          setCities(copyOfCities);
          setIndexDragged(indexDragged + 1);
          break;
      }
    }
  }, [yDragged]);


  return (
      <Animated.View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        let allYs = yDistributions;
        allYs[destination] = layout.y;
        setYDistributions(allYs);
        // setInitialY(layout.height);
        // if (destination === 'San Diego') {
        // console.log(destination);
        // console.log('height:', layout.height);
        // console.log('width:', layout.width);
        // console.log('x:', layout.x);
        // console.log('y:', layout.y);
        // }
      }}
      // onLayout approach will provide initial position after elements are painted on the screen
      style={{...styles.item, transform: [{ translateY: yCoord }]}} {...panResponder.panHandlers}>
        <Pressable
        style={styles.pressable}
        onPressIn={() => {
          setCurrDrag(destination);
          setIndexDragged(cities.indexOf(destination));
        }}
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
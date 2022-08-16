import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Pressable } from 'react-native';

export default function Drag({
  destination, cities, setCities, setCurrDrag, setNeighbor,
  // neighbor,
  setYDistributions, yDistributions,
  yDistributionsArr
  // neighborY, setNeighborY
}) {
  const [initialY, setInitialY] = useState(0);

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
    if (yDistributionsArr.length > 0) {
      // console.log(yDistributionsArr);

      yCoord.addListener(({ value }) => {
        let indexDragged = cities.indexOf(destination);
        let copyOfCities = cities.slice();
        let neighbor;
        // console.log(value, yDistributionsArr[indexDragged + 1], yDistributionsArr[indexDragged]);
        switch (true) {
          case (indexDragged === cities.length - 1 && value > 0 || indexDragged === 0 && value < 0):
            // setNeighbor(destination);
            neighbor = destination;
            break;
          case (value > 0 && value > (yDistributionsArr[indexDragged + 1] - yDistributionsArr[indexDragged])):
            // setNeighbor(cities[indexDragged + 1]);
            neighbor = copyOfCities[indexDragged + 1];
            copyOfCities[indexDragged] = neighbor;
            copyOfCities[indexDragged + 1] = destination;
            indexDragged += 1;
            // console.log(neighbor);
            // setCities(copyOfCities);
          case (value > 0):
            // setNeighbor(cities[indexDragged + 1]);
            neighbor = copyOfCities[indexDragged + 1];
            // console.log(neighbor);
            break;
          case (value < 0 && Math.abs(value) > (yDistributionsArr[indexDragged] - yDistributionsArr[indexDragged - 1])):
            // setNeighbor(cities[indexDragged - 1]);
            neighbor = copyOfCities[indexDragged - 1]
            copyOfCities[indexDragged] = neighbor;
            copyOfCities[indexDragged - 1] = destination;
            indexDragged -= 1;
            // setCities(copyOfCities);
            break;
          case (value < 0):
            // setNeighbor(cities[indexDragged - 1]);
            neighbor = copyOfCities[indexDragged = 1];
            break;
        }
    });

      // console.log(copyOfCities);
      // console.log(cities.indexOf(destination));
    };
  }, [yCoord, yDistributionsArr, cities]);
  // Event listener for Animated Value will provide y-offset values during animation

  // useEffect(() => {
  //   if (neighbor === destination) {
  //     setNeighborY(initialY);
  //   }
  // }), [neighbor];

  // useEffect(() => {

  // });

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
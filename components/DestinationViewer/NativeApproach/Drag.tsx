import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Pressable, LayoutAnimation } from 'react-native';

export default function Drag({
  destination, cities, setCities, setCurrDragItem, currDragItem, setYDistributions, yDistributions,
  yDistributionsArr, indexDragged, setIndexDragged, setYDragged, yDragged, setInitialDragIndex, initialDragIndex
}) {

  const yCoord = useRef(new Animated.Value(0)).current;

  // const springTranslation = (dy) => {
  //   switch(true) {
  //     case (dy > 0):

  //     case (dy < 0):
  //   }
  // }

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      yCoord.setValue(0);
      setCurrDragItem(destination);
      setInitialDragIndex(cities.indexOf(destination));
      setIndexDragged(cities.indexOf(destination));
     },
    onPanResponderMove: (_, { dy }) => {
      yCoord.setValue(dy);
      // console.log(dy);
      // console.log(currDragItem);
      // console.log(yCoord);
    },
    onPanResponderRelease: () => {

      yCoord.stopAnimation((lastOffset) => {
        yCoord.setOffset(lastOffset);
        yCoord.setValue(0);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            300,
            LayoutAnimation.Types.spring,
            LayoutAnimation.Properties.scaleY
          )
        );
        setIndexDragged(null);
        setCurrDragItem(null);
        setYDragged(null);
        setInitialDragIndex(null);
      });
      // Animated.spring(yCoord, {
      //   // toValue: yDistributionsArr[indexDragged] - yDistributionsArr[initialDragIndex],
      //   toValue: 0,
      //   useNativeDriver: false,
      // }).start();

    },
  })).current;

  useEffect(() => {
    if (currDragItem && currDragItem === destination) {
      yCoord.addListener(({ value }) => {
        setYDragged(value);
      });
    }
  }, [currDragItem, yDistributionsArr]);
  // Event listener for Animated Value will provide y-offset values during animation

  useEffect(() => {
    if (currDragItem && destination === currDragItem) {
      // console.log(currDragItem, indexDragged);
      // console.log(cities);
    }
  }, [yDragged]);


  useEffect(() => {
    if (yDistributionsArr.length > 0 && currDragItem && currDragItem === destination) {
      let copyOfCities = cities.slice();
      let neighbor;
      switch (true) {
        case (indexDragged === 0 && yDragged < 0 || indexDragged === cities.length - 1 && yDragged > 0):
          break;
        case (yDragged > 0 && (yDragged + yDistributionsArr[initialDragIndex]) > yDistributionsArr[indexDragged + 1]):
          neighbor = cities[indexDragged + 1];
          copyOfCities[indexDragged] = neighbor;
          copyOfCities[indexDragged + 1] = currDragItem;
          setCities(copyOfCities);
          setIndexDragged(indexDragged + 1);
          break;
        case (yDragged < 0 && (yDragged + yDistributionsArr[initialDragIndex]) < yDistributionsArr[indexDragged - 1]):
          neighbor = cities[indexDragged - 1];
          copyOfCities[indexDragged] = neighbor;
          copyOfCities[indexDragged - 1] = currDragItem;
          setCities(copyOfCities);
          setIndexDragged(indexDragged - 1);
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
        // if (destination === 'San Diego') {
        // console.log(destination);
        // console.log('height:', layout.height);
        // console.log('width:', layout.width);
        // console.log('x:', layout.x);
        // console.log('y:', layout.y);
        // }
      }}
      // onLayout approach will provide initial position after elements are painted on the screen
      style={{...styles.item,
        transform: [{ translateY: yCoord }],
        zIndex: currDragItem === destination ? 1000 : 0,
      }}
      {...panResponder.panHandlers}>
        <Pressable
        style={styles.pressable}
        // onPressIn={() => {
        //   setCurrDragItem(destination);
        //   setIndexDragged(cities.indexOf(destination));
        // }}
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
    height: 80,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
  },
  pressable : {
    height: 100,
  },
});
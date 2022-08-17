import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList, Animated} from 'react-native';
import Drag from './Drag';

const destinations = ['San Diego', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']

export default function DestinationViewer() {

  const [cities, setCities] = useState(destinations);
  const [currDragItem, setCurrDragItem] = useState(null);
  const [yDistributions, setYDistributions] = useState({});
  const [yDistributionsArr, setYDistributionsArr] = useState([]);
  const [indexDragged, setIndexDragged] = useState(null);
  const [yDragged, setYDragged] = useState(null);
  const [initialDragIndex, setInitialDragIndex] = useState(null);


  useEffect(() => {
    const coordinates = Object.values(yDistributions).sort();
    setYDistributionsArr(coordinates);
  }, [currDragItem, cities, yDistributions]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
      <View style={styles.body}>
        {destinations.map((destination) => (
          <Drag
            key={destination}
            destination={destination}
            cities={cities}
            setCities={setCities}
            currDragItem={currDragItem}
            setCurrDragItem={setCurrDragItem}
            yDistributions={yDistributions}
            setYDistributions={setYDistributions}
            yDistributionsArr={yDistributionsArr}
            indexDragged={indexDragged}
            setIndexDragged={setIndexDragged}
            setYDragged={setYDragged}
            yDragged={yDragged}
            initialDragIndex={initialDragIndex}
            setInitialDragIndex={setInitialDragIndex}
          />))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    justifyContent: 'center',
  },
});


/* FlatList implementation
Currently this FlatList implementation will disable drag movement
Also nativeEvent.layout will receive x and y coordinates relative to itself
which is both 0 for each item and not relative to the parent component.
*/

// const sampleTrip: Object = {
//   id: 100,
//   destinations: [
//     {
//       city: 'San Francisco',
//       POIs: [
//         {
//           id: 1,
//           name: 'Golden Gate Bridge',
//           details: 'An iconic red bridge'
//         },
//         {
//           id: 2,
//           name: 'Dolores Park',
//           details: 'A city park'
//         },
//         {
//           id: 3,
//           name: 'Dumpling Home',
//           details: 'A Chinese restaurant specializing in dumplings'
//         }
//       ]
//     },
//     {
//       city: 'San Diego',
//       POIs: [
//         {
//           id: 4,
//           name: 'Legoland',
//           details: 'An amusement park featuring Legos'
//         },
//         {
//           id: 5,
//           name: 'Tacos El Gordo',
//           details: 'A famous Mexican restaurant'
//         },
//         {
//           id: 6,
//           name: 'UC San Diego',
//           details: 'A public university'
//         }
//       ]
//     },
//     {
//       city: 'Los Angeles',
//       POIs: [
//         {
//           id: 7,
//           name: 'Griffith Observatory',
//           details: 'An observatory with telecopes and exhibits'
//         },
//         {
//           id: 8,
//           name: 'Disneyland',
//           details: 'The happiest place on Earth'
//         },
//         {
//           id: 9,
//           name: 'Hollywood',
//           details: 'A hub for entertainment and media'
//         }
//       ]
//     }
//   ]

// };

// export default function DestinationViewer() {

//   const renderDestination = ({ item }) => (
//     <Drag destination={item.city} />
//   );

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.header}>
//         <Text>Hello</Text>
//       </View>
//       <FlatList contentContainerStyle={styles.body} data={sampleTrip.destinations} renderItem={renderDestination} />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   header: {
//     flex: 0.2,
//     backgroundColor: '#219EBC',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   body: {
//     flex: 0.8,
//     backgroundColor: '#FB8500',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

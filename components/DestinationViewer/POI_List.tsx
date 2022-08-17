import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const POI_List = (props) => {
  const [data, setData] = useState(props.POIs);
  // console.log('here are the props', props)

  useEffect(() => {
    let copyOfCities = props.cities.slice();
    copyOfCities.forEach((city, index) => {
      if (city && city.cityName === props.currCity.cityName) {
        copyOfCities[index].POIs = data;
      }
    });
    props.setCities(copyOfCities);
  }, [data]);

  const reorderPOIs = (data: Array<Object>) => {
    // console.log('reorderPOIs invoked, setting data and attempting a PATCH request')
    // console.log('new data ->>>>> ', data)
    setData(data);
  }

  const renderItem = ({item, drag, isActive}) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => reorderPOIs(data)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#F4A261',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 32,
  },
});

export default POI_List;
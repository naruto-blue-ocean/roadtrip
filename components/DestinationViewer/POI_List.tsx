import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable, LayoutAnimation} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import POI_Delete from './POI_Delete';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

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
    // <View style = {styles.tilewrapper}>
    //   <ScaleDecorator>
    //     <TouchableOpacity
    //       onLongPress={drag}
    //       disabled={isActive}
    //       style={styles.POI}>
    //       <Text style={styles.title}>{item.name}</Text>
    //     </TouchableOpacity>
    //   </ScaleDecorator>
    //   <POI_Delete />
    // </View>

    <View style={styles.tilewrapper}>

      <Pressable style={styles.texttile}>
         <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={styles.POI}>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      </Pressable>
      <Pressable
        onPressIn={ () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          //some deletion function
        }}
        style={styles.minusicon}
      >
        <FontAwesome name="minus-circle" size={36} color="white" />
      </Pressable>
    </View>
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
  POI: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 30,
    // flexDirection: 'row'
  },
  title: {
    fontSize: 20,
  },
  minusicon: {
    flexDirection: 'row',
  },
  tilewrapper: {
    // width: '80%',
    backgroundColor: '#F4A261',
    flexDirection: 'row',
    alignItems: 'center',
  },
  texttile: {
    width: '80%'
  }

});

export default POI_List;
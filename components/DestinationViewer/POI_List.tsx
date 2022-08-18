import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable, LayoutAnimation} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import POI_Delete from './POI_Delete';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const POI_List = (props) => {
  const navigation = useNavigation();
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

  const renderPOI = ({item, drag, isActive}) => (

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
      <Pressable style={styles.addPOI}
        onPress = {() =>
          navigation.navigate('AddPOI', {city: 'San Francisco'})
        }
      >
        <Text>Add a POI &nbsp;</Text>
        <FontAwesome name="plus-circle" size={18} color="white" style={styles.addPOIButton}/>
      </Pressable>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => reorderPOIs(data)}
        keyExtractor={item => item.id}
        renderItem={renderPOI}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  POI: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 30,

  },
  title: {
    fontSize: 15,
  },
  minusicon: {
    flexDirection: 'row',
  },
  tilewrapper: {
    // width: '80%',
    backgroundColor: '#F4A261',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 6
  },
  texttile: {
    width: '80%',

  },
  addPOI: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6
  },

});

// jasper -> trip_id

export default POI_List;
import React, { useState, useEffect, useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable, LayoutAnimation, Dimensions} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from 'expo-secure-store';
import axios from 'axios';
import { LOCALTUNNEL } from '../../config';
import { AuthContext } from '../../AuthProvider.js'

const { width: SCREEN_WIDTH } = Dimensions.get("window");


const POI_List = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState(props.POIs);

  const { username } = useContext(AuthContext);
  const reorderPOIs = (afterData: Array<Object>) => {
    const beforeData = data;
    const axiosObj = {};
    for (var i = 0; i < afterData.length; i++) {
      axiosObj[afterData[i].id] = i + 1;
    }

    const path =`${LOCALTUNNEL}/trips/${props.tripId}/destinations/${props.destinationId}/pois`;

    axios.put(path, axiosObj)
    .catch((err) => {
      console.error ('errored in the POI put request', err)
      setData(beforeData);
    });
    setData( afterData);
  }

  const deletePOI = (item) => {
    const beforeData = data;

    const afterData = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].name !== item.name) {
        afterData.push(data[i])
      }
    }

    const path = (`${LOCALTUNNEL}/trips/${props.tripId}/destinations/${props.currCity.destination_id}/pois/${item.id}`);
    axios.delete(path)
      .catch((err) => {
        setData(beforeData);
      });


    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleY
      )
    );
    setData(afterData);
    props.setPOIsAfterDelete(afterData);

  };

  const renderPOI = ({item, drag, isActive}) => (
    <View style={styles.tilewrapper}>
      <Pressable style={styles.texttile}>
         <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={styles.POI}
          onPress = {() => {
            navigation.navigate('PoiViewer',
            {
              params: {
                poi_id: item.id,
               user_email: username
              }
            });
            //need to pass specific POI ID
          }}>
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
        <FontAwesome
          name="minus-circle"
          size={36}
          color="white"
          onPress = {() => {deletePOI(item)}}/>
      </Pressable>
    </View>
  );

  return (
    <View style = {styles.listWrapper}>
      <Pressable style={styles.addPOI}
        onPress = {() => {
          let maxIndex = 0;
          for (var i = 0; i < props.POIs.length; i++) {
            if (props.POIs[i].order_number > maxIndex) {
              maxIndex = props.POIs[i].order_number;
            }
          }
          navigation.navigate('AddPOI',
          {
            destination_id: props.destinationId,
            cityName: props.cityName,
            trip_id: props.tripId,
            latitude: props.lat,
            longitude: props.lng,
            maxIndex: maxIndex
          })
        }
        }
      >
        <Text style = {styles.addStopText}>Add Stops &nbsp;</Text>
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
    fontSize: 2
  },
  tilewrapper: {
    backgroundColor: '#DEDBD2',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 4,
    borderRadius: 5,
    width: '70%',
    marginHorizontal: '15%'
  },
  texttile: {
    width: '80%',
  },
  addPOI: {
    backgroundColor: '#B0C4B1',
    justifyContent: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 0.5,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    marginHorizontal: '20%',
  },
  listWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
  },

  addStopText: {
  }

});

export default POI_List;
import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function TripCard(props: any) {

  const [active, setActive] = useState(false);

  const navigation = useNavigation();
  // console.log(props.key);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('DestinationViewer', {
          tripId: props.tripId,
          tripName: props.tripName
        })
      }}
    >
      <Text style={styles.tripName}>{props.tripName}</Text>
      <View style={ props.tripStatus === 'active' ? styles.greenIndicator : styles.redIndicator}></View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 10,
    margin: 20,
  },
  tripName: {
    marginLeft: 30
  },
  greenIndicator: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  },
  redIndicator: {
    width: 10,
    height: 10,
    backgroundColor: '#f14c56',
    borderStyle: 'solid',
    borderRadius: 5,
    marginRight: 30,
    borderWidth: 1,
    borderColor: 'grey'
  }
})
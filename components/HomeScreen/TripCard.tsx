import { StyleSheet, Text, View } from 'react-native';

export default function TripCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.tripName}>Trip name</Text>
      <View style={styles.indicator}></View>
    </View>
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
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: '#0fff00',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#0fff00',
    marginRight: 40,
  }
})
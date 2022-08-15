import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TripCard from './TripCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TripCard />
      <TripCard />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
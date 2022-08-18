import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function FakeHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Initialization"
        onPress={() => { navigation.navigate('Initialization')}}
      />
      <Button
        title="Log In"
        onPress={() => { navigation.navigate('Login')}}
      />
      <Button
        title="Home"
        onPress={() => { navigation.navigate('HomeScreen')}}
      />
      {/* <Button
        title="Trip Viewer"
        onPress={() => { navigation.navigate('DestinationViewer')}}
      /> */}
      <Button
        title="Points of Interest"
        onPress={() => { navigation.navigate('POIViewer')}}
      />
      <Button
        title="Add a City"
        onPress={() => { navigation.navigate('AddCity')}}
      />
      <Button
        title="Add a Point of Interest"
        onPress={() => { navigation.navigate('AddPOI')}}
      />
      <Button
        title="Archive"
        onPress={() => { navigation.navigate('Archive')}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
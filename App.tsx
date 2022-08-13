import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PoiViewer from './components/PoiViewer.tsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Stuff</Text>
      {/* <PoiViewer/> */}
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

import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CompletedList from './CompletedList';
import TrashList from './TrashList';

export default function Archive() {

  const [whichTab, setWhichTab] = useState('Completed')

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setWhichTab('Completed')}
        >
          <Text>Completed</Text>
        </Pressable>
        <Pressable
          onPress={() => setWhichTab('Trash')}
        >
          <Text>Trash</Text>
        </Pressable>
      </View>

      <View style={styles.items}>
        {whichTab === 'Completed' &&
          <CompletedList/>
        }
        {whichTab === 'Trash' &&
          <TrashList/>
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabs: {
    display: "flex",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  items: {
    flex: 7,
  }
});
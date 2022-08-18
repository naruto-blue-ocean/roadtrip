import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
// import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider.js'
import asyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config.js'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUsername } = React.useContext(AuthContext);
  // const { setItem } = AsyncStorage('@token');

  const logInUser = async () => {

    axios.post(`${config.LOCALTUNNEL}/auth/login`, { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.user?.email);
        // asyncStorage.setItem("token", response.data.user.email);
      })
      .catch((err) => console.log('signup error', err));
    // setIsLoggedIn(true);

    // await asyncStorage.setItem("token",);
  }

  const handleSignup = () => {
    axios.post(`${config.LOCALTUNNEL}/auth/signup`, { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.user?.email);
        // asyncStorage.setItem("token", response.data.user.email);
        createAlert();
      })
      .catch((err) => console.log('signup error', err));
  }

  const createAlert = () => {
    Alert.alert(
      'Registration successful',
      'Welcome to Road Trip!',
      [
        {
          text: "Okay",
          onPress: () => console.log('OK Pressed')
        }
      ]
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {/* <StatusBar style="auto" /> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={logInUser}
          style={styles.button}
        >
          <Text
            style={styles.buttonText}
            >
              Login
              </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignup}
          style={styles.button}
        >
          <Text
            style={styles.buttonText}
            >
              Sign up
              </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 4
  },
  buttonOutline: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
});
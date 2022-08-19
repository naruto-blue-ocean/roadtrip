import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
// import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider.js'
import config from '../../config.js'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUsername } = React.useContext(AuthContext);
  // const { setItem } = AsyncStorage('@token');

  const logInUser = async () => {

    axios.post(`${config.LOCALTUNNEL}/auth/login/`, { email: email, password: password })
      .then((response) => {
        console.log('status is...', response.status);
        setUsername(response.data.user.email);
        // asyncStorage.setItem("token", response.data.user.email);
      })
      .catch((err) => {
        Alert.alert(
          'Account not found',
          'Would you like to create an account?',
          [
            {
              text: "No"
            },
            {
              text: "Yes",
              onPress: () => handleSignup()
            }
          ]
        )
        console.log(err.message)
      });
    // setIsLoggedIn(true);

    // await asyncStorage.setItem("token",);
  }

  const handleSignup = () => {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.')
      return;
    }

    if (password.length <= 7) {
      Alert.alert('Password length too short', 'Passwords must be at least 8 characters long.')
      return;
    }

    axios.post(`${config.LOCALTUNNEL}/auth/signup/`, { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        // asyncStorage.setItem("token", response.data.user.email);
        Alert.alert('Account confirmation', 'Please confirm you would like to make an account.',
          [
            {
              text: "Cancel"
            },
            {
              text: "Confirm",
              onPress: () => {
                Alert.alert(
                  'Registration successful',
                  'Welcome to Road Trip!',
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        console.log('OK Pressed')
                        setUsername(response.data.user.email);
                      }
                    }
                  ]
                )
              }
            },
          ]
        )

      })
      .catch((err) => {
        Alert.alert(
          'Sign up failed',
          'Account already exists or credentials are invalid',
          [
            {
              text: "Okay"
            }
          ]
        )
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          autoCapitalize="none"
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
    fontSize: 14,
    textAlign: 'center',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
});
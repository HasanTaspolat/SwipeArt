import React, { useEffect, useState } from 'react'

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import normalize from 'react-native-normalize';
import { firebase } from "../firebase.js"
import {
  ActivityIndicator, Text, StyleSheet, View, TextInput, ScrollView,
  Image, TouchableHighlight, Modal, ToastAndroid,
} from 'react-native';

// import TabsCustomer from './TabsCustomer';
import '@react-navigation/native-stack'
import ChooseScreenFirst from './ChooseScreenFirst';
import ResetPasswordScreen from './ResetPasswordScreen';
import RegisterScreen from './RegisterScreen';
import ResetPassword from './ResetPasswordScreen';

// onPress={() => {  navigation.navigate(LoginScreen)  }}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const auth = getAuth();
  isLoading: false;
  const [userMessage, setUserMessage] = useState()

  const handleSignInCustomer = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        onAuthStateChanged(auth, user => {
          if (user) {
            navigation.navigate(ChooseScreenFirst)
            setUserMessage('')
          }
          else {
            navigation.navigate(LoginScreen)
            setUserMessage('Wrong Password or Email! ');
          }
        })

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..

      });


  }
  return (
    <View style={styles.main}>
      <Text style={styles.header2}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor={'white'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={[styles.header2, styles.passHead]}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder='Password'
        placeholderTextColor={'white'}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <Text style={styles.userMessageTitle}>{userMessage}</Text>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="blue"
        style={styles.button}
        onPress={handleSignInCustomer}
      >
        <Text
          style={styles.button1title}>Sign In</Text>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.8}
       
        style={styles.button2}
        onPress={() => navigation.navigate(RegisterScreen)}
      >
        <Text style={styles.button2title}>Don't Have an Account? <Text style={styles.signUpTitle}> Sign Up </Text> </Text>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.8}
       
        style={styles.button2}
        onPress={() => navigation.navigate(ResetPassword)}
      >
        <Text style={styles.button2title}>Forgot your password? <Text style={styles.signUpTitle}> Reset Password </Text> </Text>
      </TouchableHighlight>
    </View>
  )

}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: normalize(50),
    borderWidth: 1.1,
    borderRadius: normalize(5),
    marginTop: normalize(20),
    paddingHorizontal: normalize(10),
    borderColor: 'white',
    color: 'white'
  },
  button: {
    borderRadius: normalize(10),
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '70%',
    height: normalize(50),
  
    marginBottom: normalize(-20)
  },
  button1title: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: normalize(18),
    paddingTop: normalize(13),
  },
  button2: {
    marginTop: normalize(60),
    paddingBottom: normalize(30),
  },
  button2title: {
    color: 'white',
    height: normalize(20),
  },
  header1: {
    marginTop: normalize(25),
    fontSize: normalize(22),
    marginLeft: normalize(0),
    fontWeight: 'bold',
    color: "#2C3345",
  },
  header2: {
    marginTop: normalize(25),
    fontSize: normalize(17),
    marginLeft: normalize(40),
    color: 'white',
    fontWeight: '600',
    marginRight: 'auto',
  },
  signUpTitle: {
    color: '#2E69FF',
  },
  bottomImage: {
    fontSize: normalize(16),
    color: "#92969e",

    marginBottom: normalize(15),
  },
  userMessageTitle: {
    paddingTop: normalize(30),
    fontSize: normalize(13),
    alignItems: 'center',
    fontWeight: 'bold',
    color: "#ff0033"
  },
})


export default LoginScreen
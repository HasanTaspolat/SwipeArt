import React, { useState } from 'react'
import {
  Text, StyleSheet, View, TextInput, ScrollView,
  Image, TouchableHighlight, Modal, AppRegistry, Linking, TouchableOpacity
} from 'react-native';
import normalize from 'react-native-normalize';
import LoginScreen from './LoginScreen';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../firebase.js"
import ChooseScreenFirst from './ChooseScreenFirst';

import '@react-navigation/native-stack'


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [toggleCheckBox, setToggleCheckBox] = useState(true)
  const [checkBoxMessage, setcheckBoxMessage] = useState()
  const [userMessage, setUserMessage] = useState()

  const handleSignUp = () => {
    const auth = getAuth();

    // onAuthStateChanged(auth, user => {
    //   if (user) {
    //     setUserMessage('')

    //   }
    //   else {

    //     setUserMessage('Wrong Password or Email! ');
    //   }
    // })

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        navigation.navigate(LoginScreen)
       
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // console.log(errorCode, errorMessage);
        navigation.navigate(RegisterScreen)
       
      });


    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     var user = userCredential.user;

    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode, errorMessage);


    //   });


  }




  return (

    <ScrollView>
      <View style={styles.main}>

        <Text style={styles.bottomImage}>welcome to SwipeArt.</Text>
     
        <Text style={styles.header1}>Sign Up</Text>
        <Text style={styles.header2}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#ffff"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.header2, styles.passHead]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          placeholderTextColor="#ffff"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.checkBoxTitle}>{checkBoxMessage}</Text>

        <TouchableHighlight style={styles.button}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => { handleSignUp() }}
        >
          <Text style={styles.button1title}>Create My Account</Text>


        </TouchableHighlight>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000000',
    width: normalize(380, 'width'),
    height: normalize(620, 'height'),
    alignItems: 'center',
    paddingTop: normalize(100),
  },
  input: {
    width: '80%',
    height: normalize(50),
    borderWidth: 1.1,
    borderRadius: normalize(5),
    marginTop: normalize(20),
    paddingHorizontal: normalize(10),
    borderColor: '#C3CAD8',
    color: '#fff',

  },
  button: {
    borderRadius: normalize(6),
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#ffff',
    width: '70%',
    height: normalize(50),
    marginBottom: normalize(-20)
  },
  button1title: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: normalize(18),
    paddingTop: normalize(13),
  },
  button2: {
    paddingTop: normalize(25),
  },
  button2title: {
    color: '#2C3345',
    height: normalize(20),
  },
  header1: {
    marginTop: normalize(25),
    fontSize: normalize(22),
    marginLeft: normalize(0),
    fontWeight: 'bold',
    color: "white"
  },
  checkBoxTitle: {
    marginBottom: normalize(25),
    fontSize: normalize(12),
    alignItems: 'center',
    fontWeight: 'bold',
    color: "#ff0033"
  },
  header2: {
    marginTop: normalize(25),
    fontSize: normalize(17),
    marginLeft: normalize(40),
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 'auto',
  },
  bottomImage: {

    fontSize: normalize(20),
    color: "white",
    position: 'absolute',
    marginTop: normalize(50),
  },
  termsText: {

    marginTop: normalize(10),
    paddingLeft: normalize(20),
    marginLeft: normalize(40),
    width: normalize(300, 'width'),
    height: normalize(50, 'height'),
    color: 'black',

  },
  checkBoxStyle: {
    alignSelf: "center",
    borderColor: '#C3CAD8',
    borderWidth: 1.1,
    borderRadius: normalize(5),
    marginRight: normalize(270),
    transform: [{ translateY: normalize(33) }],
  },

})

export default RegisterScreen

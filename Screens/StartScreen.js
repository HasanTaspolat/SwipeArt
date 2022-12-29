import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {
  StyleSheet,TouchableHighlight,Text
} from 'react-native';
import normalize from 'react-native-normalize';



export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Paragraph  style={styles.loginText} >
        swipeArt.
      </Paragraph>

   <TouchableHighlight mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.button}
      >
        <Text style={styles.button1title}>  Login</Text>
      </TouchableHighlight>

      <TouchableHighlight  mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.button}
        color="#0000"
      >
        <Text style={styles.button1title}>  Sign Up</Text>
      </TouchableHighlight>

    </Background>
  )
}


const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 18,
    color: 'black',
    backgroundColor: '#ffff',
    color: '#0000',
    alignItems:'center',
    borderRadius: normalize(25),
  },
  loginText: {
    color: '#fff',
  }
})

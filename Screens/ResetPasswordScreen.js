import React, { Component } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { getAuth, firebase, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

export default class ResetPasswordScreen extends Component {
  static navigationOptions = {
    title: 'ResetPasswordScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendResetPasswors() {
    const auth = getAuth();

    sendPasswordResetEmail(auth, this.state.email)
      .then(() => {
        Alert.alert(`Check your e-mail please! ${this.state.email}`);
        // call service and logic of business
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(`Error... ! : ${errorCode} - ${errorMessage}`);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <Text style={styles.welcome}>
          Forgot your password?
        </Text>


        <TextInput
          style={styles.emailText}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Enter email'}
          placeholderTextColor={'white'}
        />
        <TouchableHighlight
        style={styles.button}
          onPress={() => this.sendResetPasswors()}
        >
          <View style={styles.buttonForgot}>
            <Text style={styles.textButton}>
              Send reset password e-mail link!
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30
  },
  emailText: {
    borderRadius: 6,
    borderWidth: 1.1,
    borderColor: 'white',
    color: 'white',
    width: '50%',
    marginBottom: 30,
    paddingLeft: 8,
  },
  buttonForgot: {
    height: 45,
    width: 300,
    color: 'white',
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',

    fontWeight: 'bold'
  },
  button: {
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: 'blue',
    width: '70%',
    height: 50,
    marginBottom:-20
  },
});

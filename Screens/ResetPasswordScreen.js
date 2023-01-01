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
import { getAuth, firebase, createUserWithEmailAndPassword, sendPasswordResetEmail,onAuthStateChanged } from "firebase/auth";





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
   
      sendPasswordResetEmail(auth,this.state.email)
      .then(() => {
        Alert.alert(`CHECK MAIL ${this.state.email}`);
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
          Forgot u password?
        </Text>
        <TextInput
          style={styles.emailText}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Enter email'}

        />
        <TouchableHighlight
          onPress={() => this.sendResetPasswors()}
        >
          <View style={styles.buttonForgot}>
            <Text style={styles.textButton}>
              Send email now!
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
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,

    fontWeight: 'bold',
    marginBottom: 100
  },
  emailText: {
    height: 50,
    width: 300,

  },
  buttonForgot: {
    height: 45,
    width: 300,

    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 20,

    fontWeight: 'bold'
  },
});

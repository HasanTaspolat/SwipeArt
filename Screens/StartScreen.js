import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { StyleSheet, TouchableHighlight, Text, Image } from "react-native";
import normalize from "react-native-normalize";
import { View } from "../react-native-firebase/components/Themed";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Image style={styles.image} source={require("../assets/swipeart.png")} />
      <Paragraph style={styles.loginText2}>All is for you</Paragraph>
      <Paragraph style={styles.loginText3}>All is for artists.</Paragraph>
      <Paragraph style={styles.loginText}>swipeArt.</Paragraph>

      <TouchableHighlight
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.button}
        underlayColor="#DDDDDD"
      >
        <Text style={styles.button1title}> Login </Text>
      </TouchableHighlight>

      <TouchableHighlight
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
        style={styles.button}
        color="#0000"
        underlayColor="#DDDDDD"
      >
        <Text style={styles.button1title}> Sign Up</Text>
      </TouchableHighlight>
    </Background>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 18,
    color: "black",
    backgroundColor: "#ffff",
    color: "#0000",
    alignItems: "center",
    borderRadius: normalize(25),
  },
  loginText: {
    color: "#fff",
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "bold",
  },
  loginText2: {
    marginBottom: 20,
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  loginText3: {
    marginBottom: 50,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 50,
  },
});

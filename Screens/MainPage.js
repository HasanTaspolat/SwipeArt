import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import Sidebar from "./SidebarCustomer";
import SwipeContainer from "./SwipeContainer";
import SwipeCard from "./SwipeCard";
import jsonData from "../person.json";
import BottomNavigationCustomer from "./BottomNavigationCustomer";

const customFonts = {
  circular: require("../assets/circular.ttf"),
};

async function loadFonts() {
  await Font.loadAsync(customFonts);
}

loadFonts();

export default function MainPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Sidebar navigation={navigation} />
      <SwipeContainer />
      <BottomNavigationCustomer
        style={styles.naviationContainer}
      ></BottomNavigationCustomer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "rgba(2, 4, 14, 1)",
    display: "flex",
    flexDirection: "column",
  },
  imageCard: {
    width: 350,
    height: 620,
    marginBottom: 40,
  },
  ViewimageText: {
    position: "absolute",
    alignItems: "center",
  },
  imageText: {
    top: 190,
    left: 80,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
}); 
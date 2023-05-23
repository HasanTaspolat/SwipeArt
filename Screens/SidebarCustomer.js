import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LoginScreen from "./LoginScreen";
import SettingsScreen from "./SettingsScreen";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const translation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const handleNavigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
    Animated.timing(animationValue, {
      toValue: isSidebarOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setIsSidebarOpen(!isSidebarOpen));
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const multiplePresses = () => {
    setIsSidebarOpen(false);
    handleNavigateToScreen(SettingsScreen);
  };

  const sidebarWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const opacity = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <Animated.View
            style={[
              styles.sidebar,
              { width: sidebarWidth },
              {
                transform: [{ translateX: opacity }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={handleSidebarClose}
            >
              <AntDesign name="close" size={24} color="white" />
              <Text style={styles.settingsText}> Close </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={multiplePresses}
            >
              <AntDesign name="setting" size={24} color="white" />
              <Text style={styles.settingsText}> Settings </Text>
            </TouchableOpacity>
            {/*   <TouchableOpacity
              style={styles.settingsIcon}
              onPress={multiplePresses}
            >
              <AntDesign name="folder1" size={24} color="white" />
              <Text style={styles.settingsText}> All Listings </Text>
            </TouchableOpacity> */}
          </Animated.View>
        </View>
      )}
      <TouchableOpacity style={styles.icon} onPress={handleSidebarOpen}>
        <AntDesign name="menu-fold" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 120,
    zIndex: 222,
    backgroundColor: "red",
    justifyContent: "flex-end",
  },
  icon: {
    position: "absolute", // add if dont work with above
    left: 20,
    top: normalize(60),
  },
  sidebar: {
    position: "absolute",
    top: normalize(3),
    left: 0,
    height: windowHeight,
    width: "50%",
    backgroundColor: "black",
    zIndex: 22,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(30),
  },
  sidebarText: {
    fontSize: 20,
    fontWeight: "bold",

    color: "white",
  },
  closeIcon: {
    marginBottom: 20,
    top: normalize(25),
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  settingsIcon: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Sidebar;

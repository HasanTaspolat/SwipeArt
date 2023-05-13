import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize";

const BottomNavigation = () => {
  const navigation = useNavigation();

  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const [isPressedProfile, setisPressedProfile] = useState(false);
  const handlePressInProfile = () => setisPressedProfile(true);
  const handlePressOutProfile = () => setisPressedProfile(false);

  const [isPressedChat, setisPressedChat] = useState(false);
  const handlePressInChat = () => setisPressedChat(true);
  const handlePressOutChat = () => setisPressedChat(false);

  const [activeScreen, setActiveScreen] = useState("ArtistDashboardPage");

  const onPress = (screenName) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.tabButton,
            activeScreen === "ArtistDashboardPage" && styles.activeTabButton,
          ]}
          onPress={() => onPress("ArtistDashboardPage")}
        >
          <Icon
            style={[{ color: isPressed ? "blue" : "black" }]}
            name={
              activeScreen === "ArtistDashboardPage" ? "ios-home" : "ios-home"
            }
            size={24}
          />
          <Text
            style={[
              styles.tabText,
              activeScreen === "ArtistDashboardPage" && {
                color: isPressed ? "blue" : "black",
              },
            ]}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <TouchableOpacity
          onPressIn={handlePressInProfile}
          onPressOut={handlePressOutProfile}
          style={[
            styles.tabButton,
            activeScreen === "ProfileScreen" && styles.activeTabButton,
          ]}
          onPress={() => onPress("ProfileScreen")}
        >
          <Icon
            style={[{ color: isPressedProfile ? "blue" : "black" }]}
            name={
              activeScreen === "ProfileScreen" ? "ios-person" : "ios-person"
            }
            size={24}
          />
          <Text
            style={[
              styles.tabText,
              activeScreen === "ProfileScreen" && {
                color: isPressedProfile ? "blue" : "black",
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <TouchableOpacity
          onPressIn={handlePressInChat}
          onPressOut={handlePressOutChat}
          style={[
            styles.tabButton,
            activeScreen === "ChatScreen" && styles.activeTabButton,
          ]}
          onPress={() => onPress("ChatScreen")}
        >
          <Icon
            style={[{ color: isPressedChat ? "blue" : "black" }]}
            name={activeScreen === "ChatScreen" ? "ios-chatbox" : "ios-chatbox"}
            size={24}
          />
          <Text
            style={[
              styles.tabText,
              activeScreen === "ChatScreen" && {
                color: isPressedChat ? "blue" : "black",
              },
            ]}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    marginTop: normalize(180),
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabButton: {},
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabText: {},
});

export default BottomNavigation;

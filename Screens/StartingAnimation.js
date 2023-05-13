import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";

export default function StartingAnimation({ navigation }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    const navigationTimer = setTimeout(() => {
      navigation.navigate("StartScreen");
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="black"
      animationStyle={styles.lottie}
      source={require("../assets/loading3.json")}
      speed={1}
    >
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
  text: {
    color: "white",
    marginTop: 20,
  },
});

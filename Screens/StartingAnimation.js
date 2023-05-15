import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";

export default function StartingAnimation({ navigation }) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('StartScreen');
    }, 5000); // Set the duration in milliseconds here

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      {showAnimation && (
        <AnimatedLoader
          visible={true}
          overlayColor="black"
          animationStyle={styles.lottie}
          source={require("../assets/loading3.json")}
          progress={animationProgress}
        >
        </AnimatedLoader>
      )}

      {!showAnimation && (
        <Text style={styles.text}>Animation completed. Navigating to StartScreen...</Text>
      )}

      <LottieView
        source={require("../assets/loading3.json")}
        progress={animationProgress}
        style={{ height: 0, width: 0 }}
        onAnimationFinish={() => setShowAnimation(false)}
      />
    </>
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

import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";

export default function StartingAnimation() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  return (
    <>
      {showAnimation && (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(2, 4, 14, 1)"
          animationStyle={styles.lottie}
          source={require("../assets/loading3.json")}
          progress={animationProgress}
        ></AnimatedLoader>
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

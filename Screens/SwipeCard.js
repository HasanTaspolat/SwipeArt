import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SwipeCard = ({ data, onSwipe, onSwipeLeft, onSwipeRight, children }) => {
  const [color, setColor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [constant, setConstant] = useState(true);
  const [position, setPosition] = useState(new Animated.ValueXY());
  const [gestureDy, setGestureDy] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          setIsLiked(true);
        } else if (gestureState.dx < -10) {
          setIsDisliked(true);
        } else if (gestureState.dx === 0) {
          setConstant(true);
        }
      },
    })
  );

  useEffect(() => {
    setColor(null);
    setIsLiked(false);
    setIsDisliked(false);
    setPosition(new Animated.ValueXY());
  }, [data]);

  useEffect(() => {
    if (isLiked) {
      setColor("#2ecc71");
      Animated.timing(position, {
        toValue: { x: 600, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onSwipeRight();
      });
    } else if (isDisliked) {
      setColor("#e74c3c");
      Animated.timing(position, {
        toValue: { x: -600, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onSwipeLeft();
      });
    } else if (constant) {
      setColor("rgba(2, 4, 14, 1)");
    }
  }, [isLiked, constant, isDisliked]);

  const rotateCard = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-50deg", "0deg", "50deg"],
    extrapolate: "clamp",
  });

  const handleButtonPressLeft = () => {
    Animated.timing(position, {
      toValue: { x: -600, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onSwipeLeft();
    });
  };

  const handleButtonPressRight = () => {
    Animated.timing(position, {
      toValue: { x: 600, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onSwipeRight();
    });
  };
  return (
    <View style={styles.container}>
      {/* Swipe card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              ...position.getTranslateTransform(),
              { rotate: rotateCard },
            ],
          },
          color && { backgroundColor: color },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
        <TouchableOpacity
          style={styles.buttonModal}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.open}>OPEN</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Add the content of your modal here */}
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          {/* Add your modal content */}
          <Text style={styles.name}>selam</Text>
        </View>
      </Modal>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPressLeft()}
      >
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => handleButtonPressRight()}
      >
        <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    height: 500,
    width: "100%",
    borderRadius: 10,
    left: 0,
    right: 0,
    marginTop: 80,
  },
  name: {
    color: "white",
  },
  open: {
    color: "rgba(207, 208, 223, 1)",
    fontFamily: "circular",
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    top: 500,
    width: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
    left: "30%",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonModal: {
    position: "absolute",
    top: 270,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(131, 138, 249, 1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    left: "25%",
  },
  button2: {
    position: "absolute",
    top: 500,
    width: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    right: "30%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default SwipeCard;

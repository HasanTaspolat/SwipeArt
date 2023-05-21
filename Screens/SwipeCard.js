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
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
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

  //console.log(data);
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
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.name}>{data.nameSurname}</Text>
          <Text style={styles.name}>{data.bio}</Text>
          <Text style={styles.name}>{data.profession}</Text>
          <Text style={styles.name}>{data.username}</Text>

          <View style={styles.socialLinks}>
            {data.socialMedia && data.socialMedia.behance !== "" && (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(data.socialMedia.behance)}
                >
                  <Icon
                    style={styles.socialMediaIcon}
                    name="behance"
                    size={25}
                    color="#1769FF"
                  />
                </TouchableOpacity>
              </View>
            )}

            {data.socialMedia && data.socialMedia.twitter !== "" && (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(data.socialMedia.twitter)}
                >
                  <Icon
                    style={styles.socialMediaIcon}
                    name="twitter"
                    size={25}
                    color="#1DA1F2"
                  />
                </TouchableOpacity>
              </View>
            )}

            {data.socialMedia && data.socialMedia.instagram !== "" && (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(data.socialMedia.instagram)}
                >
                  <Icon
                    style={styles.socialMediaIcon}
                    name="instagram"
                    size={25}
                    color="#C13584"
                  />
                </TouchableOpacity>
              </View>
            )}

            {data.socialMedia && data.socialMedia.linkedin !== "" && (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(data.socialMedia.linkedin)}
                >
                  <Icon
                    style={styles.socialMediaIcon}
                    name="linkedin"
                    size={25}
                    color="#0077B5"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/*     {data.socialMedia.behance && (
            <Text style={styles.name}>
              Instagram: {data.socialMedia.behance}
            </Text>
          )}
          {data.socialMedia.instagram && (
            <Text style={styles.name}>
              Instagram: {data.socialMedia.instagram}
            </Text>
          )}
          {data.socialMedia.twitter && (
            <Text style={styles.name}>
              Instagram: {data.socialMedia.twitter}
            </Text>
          )}
          {data.socialMedia.linkedin && (
            <Text style={styles.name}>
              Instagram: {data.socialMedia.linkedin}
            </Text>
          )} */}

          {/*  {data.socialMedia.behance && (
            <Text style={styles.name}>Behance: {data.socialMedia.behance}</Text>
          )} */}

          {/* Add more social media accounts as needed */}
          {/* Render additional artist information here */}
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
  bottomTexts: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 36, 36, 0.62)",
    width: 370,
    borderColor: "rgba(197, 197, 197, 0.62)",
    borderWidth: 1,
    fontFamily: "circular",
    paddingHorizontal: 20,
  },
  bottomTexts2: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    fontFamily: "circular",
  },
  bottomText: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
    paddingVertical: 10,
    fontFamily: "circular",
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
    paddingHorizontal: 50,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  socialLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  socialLinks2: {
    marginLeft: 10,
    fontFamily: "circular",
  },
  iconContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  
});

export default SwipeCard;

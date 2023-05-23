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
import normalize from "react-native-normalize";
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
  const [showCVModal, setShowCVModal] = useState(false);
  const [CVImageUrl, setCVImageUrl] = useState("");
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

  //console.log(data);

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
          <Text style={styles.name}>Name Surname: {data.nameSurname}</Text>
          <Text style={styles.name}>Biography: {data.bio}</Text>
          <Text style={styles.name}>Profession: {data.profession}</Text>
          <Text style={styles.name}>Username: @{data.username}</Text>

          <Text style={styles.sos}>Social Media Links:</Text>

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

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.viewCv}
              onPress={() => {
                setCVImageUrl(data.cv);
                setShowCVModal(true);
              }}
            >
              <Text style={styles.cvBut}>View CV</Text>
            </TouchableOpacity>

            {showCVModal && (
              <Modal
                visible={showCVModal}
                transparent={true}
                style={styles.allModal}
                onRequestClose={() => setShowCVModal(false)}
              >
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowCVModal(false)}
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={styles.cvContainer}>
                    <Text style={styles.sos2}>CV of {data.nameSurname}: </Text>
                    <Image
                      source={{ uri: CVImageUrl }}
                      style={styles.cvImage}
                      resizeMode="center"
                    />
                  </View>
                </View>
              </Modal>
            )}
          </View>
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
    marginTop: normalize(40),
  },
  cvImage: {
    height: 200,
    width: 200,
  },
  name: {
    color: "white",
    margin: normalize(8),
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 36, 36, 0.62)",
    width: 240,
    borderColor: "rgba(197, 197, 197, 0.62)",
    borderWidth: 1,
    padding: normalize(12),
    textAlign: "center",
  },
  cvImage: {
    height: 300,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
  },
  sos2: {
    color: "white",
    margin: normalize(8),
    fontSize: 16,
    width: "100%",
    padding: normalize(16),
    textAlign: "center",
    justifyContent: "center",
    display: "flex", // Changed from "flex" to "block"
    left: normalize(70),
  },
  sos: {
    color: "white",
    margin: normalize(8),
    fontSize: 16,
    width: "100%",
    padding: normalize(16),
    textAlign: "center",
    justifyContent: "center",
    display: "flex", // Changed from "flex" to "block"
  },
  cvContainer: {
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  cvBut: {
    color: "white",
    margin: normalize(8),
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(12, 13, 46, 0.96)",
    borderColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    padding: normalize(16),
    textAlign: "center",
    borderRadius: 14,
  },

  open: {
    color: "rgba(207, 208, 223, 1)",
    fontFamily: "circular",
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    top: normalize(430),
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
    top: normalize(430),
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
    top: normalize(30),
    margin: normalize(30),
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

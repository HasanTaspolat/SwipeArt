import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SwipeCard = ({ data, onSwipe, onSwipeLeft, onSwipeRight, children }) => {
  const [color, setColor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [constant, setConstant] = useState(true);
  const [position, setPosition] = useState(new Animated.ValueXY());
  const [gestureDy, setGestureDy] = useState(0);
  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          setIsLiked(true);
        }
        else if (gestureState.dx < -10) {
          setIsDisliked(true);
        }
        else if (gestureState.dx === 0) {
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
      setColor('#2ecc71');
      Animated.timing(position, {
        toValue: { x: 600, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onSwipeRight();
      });
    }
    else if (isDisliked) {

      setColor('#e74c3c');
      Animated.timing(position, {
        toValue: { x: -600, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onSwipeLeft();
      });
    }
    else if (constant) {
      setColor('black');
    }
  }, [isLiked, constant, isDisliked]);

  const rotateCard = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-50deg', '0deg', '50deg'],
    extrapolate: 'clamp',
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
      <Animated.View
        style={[
          styles.card,
          { transform: [...position.getTranslateTransform(), { rotate: rotateCard }] },
          color && { backgroundColor: color },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={() => handleButtonPressLeft()}
      >
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => handleButtonPressRight()} >
        <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );

};
const styles = StyleSheet.create({

  card: {
    marginTop:0,
    position: 'absolute',
    width: "100%",
    height: 500,
    borderRadius: 10,
    left: 0,
    right: 0,
    borderColor:"white",
    borderWidth:0.55,
  },
  button: {
    position: 'absolute',
    top: height - 300,
    width: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    left: "30%",
  },
  button2: {
    position: 'absolute',
    top: height - 300,
    width: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 15,
    right: "30%",

  },
});

export default SwipeCard;
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const SWIPE_THRESHOLD = 120;

const { width, height } = Dimensions.get('window');

const SwipeCard = ({
  cardIndex,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  children,
}) => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: width + 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeRight(cardIndex));
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -width - 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeLeft(cardIndex));
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotateCard = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...position.getTranslateTransform(), { rotate: rotateCard }],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.cardStyle, animatedCardStyle]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 400,
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 250
  },
  cardStyle: {
    width: '80%',
    height: '80%',
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 350
  },
});

export default SwipeCard;
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  const [activeScreen, setActiveScreen] = useState('ArtistDashboardPage');

  const onPress = (screenName) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, activeScreen === 'ArtistDashboardPage' && styles.activeTabButton]}
        onPress={() => onPress('ArtistDashboardPage')}
      >
        <Icon
          name={activeScreen === 'ArtistDashboardPage' ? 'ios-home' : 'ios-home-outline'}
          size={30}
          color={activeScreen === 'ArtistDashboardPage' ? 'blue' : 'black'}
        />
        <Text style={[styles.tabText, activeScreen === 'ArtistDashboardPage' && styles.activeTabText]}>ArtistDashboardPage</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeScreen === 'ProfileScreen' && styles.activeTabButton]}
        onPress={() => onPress('ProfileScreen')}
      >
        <Icon
          name={activeScreen === 'ProfileScreen' ? 'ios-list' : 'ios-list-outline'}
          size={30}
          color={activeScreen === 'ProfileScreen' ? 'blue' : 'black'}
        />
        <Text style={[styles.tabText, activeScreen === 'ProfileScreen' && styles.activeTabText]}>ProfileScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabText: {
    color: 'blue',
  },
});

export default BottomNavigation;
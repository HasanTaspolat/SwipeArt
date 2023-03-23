import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import normalize from 'react-native-normalize';

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
                    name={activeScreen === 'ArtistDashboardPage' ? 'ios-home' : 'ios-home'}
                    size={24}
                />
                <Text style={[styles.tabText, activeScreen === 'ArtistDashboardPage']}>ArtistDashboardPage</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tabButton, activeScreen === 'ProfileScreen' && styles.activeTabButton]}
                onPress={() => onPress('ProfileScreen')}
            >
                <Icon
                    name={activeScreen === 'ProfileScreen' ? 'ios-list' : 'ios-list-outline'}
                    size={24}
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
        marginTop: normalize(170),
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeTabButton: {
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
    },
    activeTabText: {
    },
});

export default BottomNavigation;
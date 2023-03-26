import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import normalize from 'react-native-normalize';

const BottomNavigationCustomer = () => {
    const navigation = useNavigation();

    const [isPressed, setIsPressed] = useState(false);
    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);


    const [isPressedProfile, setisPressedProfile] = useState(false);
    const handlePressInProfile = () => setisPressedProfile(true);
    const handlePressOutProfile = () => setisPressedProfile(false);

    const [activeScreen, setActiveScreen] = useState('MainPage');

    const onPress = (screenName) => {
        setActiveScreen(screenName);
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={[styles.tabButton, activeScreen === 'MainPage' && styles.activeTabButton]}
                    onPress={() => onPress('MainPage')}
                >
                    <Icon
                        style={[{ color: isPressed ? 'blue' : 'black' }]}
                        name={activeScreen === 'MainPage' ? 'ios-home' : 'ios-home'}
                        size={24}
                    />
                    <Text style={[styles.tabText, activeScreen === 'MainPage' && { color: isPressed ? 'blue' : 'black' }]}>Swipe</Text>
                </TouchableOpacity>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <TouchableOpacity
                    onPressIn={handlePressInProfile}
                    onPressOut={handlePressOutProfile}
                    style={[styles.tabButton, activeScreen === 'ProfileScreenCustomer' && styles.activeTabButton]}
                    onPress={() => onPress('ProfileScreenCustomer')}
                >
                    <Icon
                        style={[{ color: isPressedProfile ? 'blue' : 'black' }]}
                        name={activeScreen === 'ProfileScreenCustomer' ? 'ios-person' : 'ios-person'}
                        size={24}
                    />
                    <Text style={[styles.tabText, activeScreen === 'ProfileScreenCustomer' && { color: isPressedProfile ? 'blue' : 'black' }]}>Profile</Text>

                </TouchableOpacity>
            </TouchableWithoutFeedback>
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
        position: "relative",
        bottom: 0,
        marginTop: normalize(172),
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

export default BottomNavigationCustomer;
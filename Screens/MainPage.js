import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image, ImageBackground
} from 'react-native';
import Sidebar from './Sidebar';
import SwipeContainer from './SwipeContainer';
import SwipeCard from './SwipeCard';
import jsonData from '../person.json';
import BottomNavigationCustomer from './BottomNavigationCustomer';

export default function MainPage({ navigation }) {

    return (
        <View style={styles.container}>
            <Sidebar navigation={navigation} />
            <SwipeContainer />
            <BottomNavigationCustomer style={styles.naviationContainer}></BottomNavigationCustomer>
        </View >


    );
}

const styles = StyleSheet.create({
    naviationContainer: {
        marginTop: 1200,
    },
    container: {
        backgroundColor: 'black',
        display: "flex",
        flexDirection: "column",
    },
    imageCard: {
        width: 350,
        height: 620,
        marginBottom: 40,
        transform: [
            { scale: 0.85 },
        ],
    },
    ViewimageText: {
        position: 'absolute',
        alignItems: 'center',
    },
    imageText: {
        top: 190,
        left: 80,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});

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



export default function MainPage({ navigation }) {

    return (
        <View style={styles.container}>
            <Sidebar navigation={navigation} />
            <SwipeContainer
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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









/*


import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image, ImageBackground
} from 'react-native';
import Sidebar from './Sidebar';

export default function MainPage({ navigation }) {

    return (
        <View style={styles.container}>
        <Sidebar navigation={navigation} />
       
      </View>

    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
    },
  });
  
  */
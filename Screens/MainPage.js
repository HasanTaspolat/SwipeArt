import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image, ImageBackground
} from 'react-native';

export default function MainPage({ navigation }) {

    return (
        <View style={styles.container}>

            <Image source={require("../assets/card-image.png")} style={styles.imageCard} />
            <View style={styles.ViewimageText}>
                <Text style={styles.imageText}>John Kelly</Text>
                <Text style={styles.imageText}>Musician</Text>
            </View>


        </View>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

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
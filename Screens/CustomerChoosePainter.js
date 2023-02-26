import React, { useState } from 'react'
import Background from '../components/Background'
import {
    Text, StyleSheet, View, TextInput, ScrollView,
    Image, TouchableHighlight, Modal, AppRegistry, Linking, TouchableOpacity
} from 'react-native';
import MainPage from './MainPage';

export default function CustomerChoosePainter({ navigation }) {

    return (
        <Background>
            <Text style={[{ color: 'white', marginBottom: 20, fontWeight: 'bold' }]} > which specific profession are you looking for?</Text>
            <TouchableHighlight
                onPress={() => navigation.navigate(MainPage)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Digital Design
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => navigation.navigate(MainPage)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Restoration
                    </Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate(MainPage)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Graffiti
                    </Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate(MainPage)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Industrial
                    </Text>
                </View>
            </TouchableHighlight>
        </Background >
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: 200,
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#3451FF',
        borderRadius: 15,

        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },

        shadowOpacity: 0.15,
        shadowRadius: 6.46,
        elevation: 9,

    },
    textButton: {
        color: 'white',
    },
    textButton2: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
})

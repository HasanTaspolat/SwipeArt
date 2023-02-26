import React, { useState } from 'react'
import Background from '../components/Background'
import {
    Text, StyleSheet, View, TextInput, ScrollView,
    Image, TouchableHighlight, Modal, AppRegistry, Linking, TouchableOpacity
} from 'react-native';
import ArtistMusician from './ArtistMusician';
import ArtistPainter from './ArtistPainter';
import ChooseScreenFirst from './ChooseScreenFirst';
import CustomerChooseScreenFirst from './CustomerChooseScreenFirst';



export default function ArtistOrCustomer({ navigation }) {

    return (
        <Background>
            <Text style={[{ color: 'white', marginBottom: 20, fontWeight: 'bold' }]} >Are u customer or artist?</Text>
            <TouchableHighlight
                onPress={() => navigation.navigate(ChooseScreenFirst)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Artist
                    </Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
                onPress={() => navigation.navigate(CustomerChooseScreenFirst)}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Customer
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
})

import React, { useState } from 'react'
import Background from '../components/Background'
import {
    Text, StyleSheet, View, TextInput, ScrollView,
    Image, TouchableHighlight, Modal, AppRegistry, Linking, TouchableOpacity
} from 'react-native';

export default function ChooseScreenFirst({ navigation }) {

    return (
        <Background>
            <Text style={[{ backgroundColor: 'red'}]} > CONTINUE FROM THERE</Text>
    </Background >
  )
}

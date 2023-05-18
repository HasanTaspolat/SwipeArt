import React, { useState } from 'react'
import Background from '../components/Background'
import {
    Text, StyleSheet, View, TextInput, ScrollView,
    Image, TouchableHighlight, Modal, AppRegistry, Linking, TouchableOpacity
} from 'react-native';
import MainPage from './MainPage';
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { db } from '../components/config';
import { RadioButton } from 'react-native-paper';

export default function CustomerChoosePainter({ navigation }) {
    
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const [design, setdesign] = useState(false);
    const [restoration, setrest] = useState(false);
    const [graf, setgraf] = useState(false);
    const [industrial, setind] = useState(false);


 // THIS SECTION ONLY SETS INITIAL SCORES
 // REST WILL CHANGE ON ALGORITHM
    function setMusicianPreference() {
            updateDoc(doc(db, "users", uid , "userPreference", "PainterTypes"), {  
                design: design === true ? 1 : 0,
                restoration: restoration === true ? 1 : 0,
                graffiti: graf === true ? 1 : 0,
                indistury: industrial === true ? 1 : 0,
            }).then(() => { 
            // Data saved successfully!
            console.log('data submitted');
            updateDoc(doc(db, "users", uid), {  
                completed: 1,
            })  
            navigation.navigate(MainPage)        
            }).catch((error) => { 
                // The write failed...
            console.log("error");
            });
    }


    return (
        <Background>
            <Text style={[{ color: 'white', marginBottom: 20, fontWeight: 'bold' }]} > Which specific profession are you looking for?</Text>
            <View style={styles.container}>
                <RadioButton 
                    label="Design"
                    value="1"
                    status={ design === true ? 'checked' : 'unchecked' }
                    onPress={() => setdesign(!design)}
                    />
                    <Text style={styles.textButton}>
                        Digital Design
                    </Text>
            </View>
            <View style={styles.container}>
                <RadioButton 
                    label="Restoration"
                    value="1"
                    status={ restoration === true ? 'checked' : 'unchecked' }
                    onPress={() => setrest(!restoration)}
                    />
                    <Text style={styles.textButton}>
                        Restoration
                    </Text>
            </View>
            <View style={styles.container}>
                <RadioButton 
                    label="graffiti"
                    value="1"
                    status={ graf === true ? 'checked' : 'unchecked' }
                    onPress={() => setgraf(!graf)}
                    />
                    <Text style={styles.textButton}>
                        Graffiti
                    </Text>
            </View>

            <View style={styles.container}>
                <RadioButton 
                    label="industrial"
                    value="1"
                    status={ industrial === true ? 'checked' : 'unchecked' }
                    onPress={() => setind(!industrial)}
                    />
                    <Text style={styles.textButton}>
                        Industrial
                    </Text>
            </View>

            <TouchableHighlight
                onPress={() => setMusicianPreference()}
            >
                <View style={styles.button}>
                    <Text style={styles.textButton}>
                        Next
                    </Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight
                onPress={() => navigation.navigate(MainPage)}
            >
                <View >
                    <Text style={styles.textButton2}>
                        Others+
                    </Text>
                    <Text style={styles.textButton2}>
                        feel free to contact us!
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

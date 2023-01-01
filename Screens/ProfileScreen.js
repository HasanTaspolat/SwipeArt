import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {

    const handleEditPress = () => {

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>

                <Image
                    style={styles.coverPhoto}
                    source={require("../assets/white.png")}
                />
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profilePhoto}
                        source={require("../assets/card-image.png")}
                    />
                    <Text style={styles.nameText}>John Kelly</Text>
                </View>
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>
                    Bio Text of the user..  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
                    ullamcorper nisi.
                </Text>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statContainer}>
                    <Text style={styles.statCount}>1</Text>
                    <Text style={styles.statLabel}>Listing</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={styles.statCount}>12</Text>
                    <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={styles.statCount}>38</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleEditPress}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <Text style={styles.buttonText2}>Social Media Links</Text>

            <Text style={styles.buttonText2}><Ionicons name="logo-twitter" color='white' size={20} />   twitter.com</Text>
              
            <Text style={styles.buttonText2}><Ionicons name="pause-circle-outline" color='white' size={20} />   spotify.com</Text>
            <Text style={styles.buttonText2}><Ionicons name="logo-facebook" color='white' size={20} />   facebook.com</Text>
            <Text style={styles.buttonText2}><Ionicons name="logo-linkedin" color='white' size={20} />   linkedin.com</Text>
     


        </ScrollView>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        alignItems: 'center',
    },
    coverPhoto: {
        width: '100%',
        height: 100,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: -50,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    bioContainer: {
        padding: 15,
    },
    bioText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    statContainer: {
        alignItems: 'center',
        flex: 1,
    },
    statCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    statLabel: {
        fontSize: 16,
        color: 'white',
    },
    button: {
        backgroundColor: '#0066cc',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    buttonText2: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
        marginLeft: 22,
        marginTop: 15,
    },
};

export default ProfileScreen;
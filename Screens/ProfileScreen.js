import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import BottomNavigationArtist from './BottomNavigationArtist';

const EditProfileScreen = ({ navigation }) => {
    const [editingMode, setEditingMode] = useState(false);
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('I like to code.');
    const [imageUri, setImageUri] = useState('https://i.pravatar.cc/150');
    const [documentUri, setDocumentUri] = useState('');
    const [facebook, setFacebook] = useState('https://facebook.com/johndoe');
    const [twitter, setTwitter] = useState('https://twitter.com/johndoe');
    const [instagram, setInstagram] = useState('https://instagram.com/johndoe');
    const [base64Src, setBase64Src] = useState(null);


    const handleSave = () => {
        setEditingMode(false);
        // Save changes to user profile
    }

    const displayDocument = async (res) => {
        try {
            console.log("selam fourth");


        } catch (e) {
            // error
        }

    };

    const handleImageUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    }

    const handleDocumentUpload = async () => {

        let result = await DocumentPicker.getDocumentAsync({});

        if (result.type === 'success') {
            setDocumentUri(result.uri);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setEditingMode(true)}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                {editingMode && (
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleImageUpload}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </TouchableOpacity>
            </View>
            {editingMode ? (
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={styles.input}
                        value={bio}
                        onChangeText={setBio}
                    />
                    <Text style={styles.label}>Document (PDF)</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
                        <Feather name="upload" size={24} color="white" />
                        <Text style={styles.uploadText}>Upload document</Text>
                    </TouchableOpacity>
                    {documentUri ? (
                        <Text style={styles.documentUri}>{documentUri}</Text>
                    ) : null}
                    <Text style={styles.label}>Social Media Links</Text>
                    <TextInput
                        style={styles.input}
                        value={facebook}
                        onChangeText={setFacebook}
                        placeholder="Facebook"
                    />
                    <TextInput
                        style={styles.input}
                        value={twitter}
                        onChangeText={setTwitter}
                        placeholder="Twitter"
                    />
                    <TextInput
                        style={styles.input}
                        value={instagram}
                        onChangeText={setInstagram}
                        placeholder="Instagram"
                    />
                </View>
            ) : (
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.bio}>{bio}</Text>
                    <View style={styles.socialLinks}>
                        <Text style={styles.statCount}>Social Links:</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(facebook)}>
                            <Feather name="facebook" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(twitter)}>
                            <Feather style={styles.socialLinks2} name="twitter" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
                            <Feather style={styles.socialLinks2} name="instagram" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    {documentUri ? (
                        <TouchableOpacity onPress={() => displayDocument()}>
                            <Text style={styles.documentLink}>View Document</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            )}
               <BottomNavigationArtist></BottomNavigationArtist>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        color: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
    },
    editText: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 40,

    },
    saveText: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 40,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    form: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        color: "white",
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    uploadText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    profileInfo: {
        alignItems: 'center',
        padding: 16,
        color: "white",
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "white",
    },
    bio: {
        fontSize: 16,
        marginBottom: 16,
        color: "white",
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: "center",
        marginBottom: 16,
        alignItems:"center"
    },

    socialLinks2: {
        marginLeft: 10,
        marginBottom: 16,
    },
    documentLink: {
        color: 'red',
        textDecorationLine: 'underline',
    },
    documentUri: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
});

export default EditProfileScreen;
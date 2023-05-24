import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import { storage, ref, uploadBytes } from "firebase/storage";
import { database } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";

const EditListing = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AllListings");
  };
  const route = useRoute();
  const [title, setTitle] = useState(route.params.title);
  const [desc, setDesc] = useState(route.params.desc);
  const [image, setImage] = useState(route.params.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(route.params.visible);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const handleEditListing = async () => {
    try {
      setError("");
      setLoading(true);
      const listingRef = doc(
        database,
        "users",
        uid,
        "listings",
        route.params.id
      );

      await setDoc(listingRef, { title, desc, image }, { merge: true });
      setTitle("");
      setDesc("");
      if (image !== route.params.image) {
        // delete old image if it exists
        if (route.params.image) {
          const oldImageRef = ref(storage, `images/${route.params.id}`);
          await deleteObject(oldImageRef);
        }

        const imageRef = ref(storage, `images/${listingRef.id}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        await setDoc(listingRef, { image: imageUrl }, { merge: true });
      }
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      setError("Failed to edit listing");
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    const options = {
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    let result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  /*   const toggleVisible = () => {
    setVisible(!visible);
  }; */

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleEditListing}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Save"}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    back: {
      position: "absolute",
      top: 40,
      left: 20,
      padding: 5,
      width: 30,
      borderRadius: 12,
      backgroundColor: "#673AB7",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#fff",
    },
    input: {
      borderWidth: 1,
      borderColor: "#9370DB",
      borderRadius: 4,
      padding: 10,
      marginBottom: 20,
      width: "100%",
      backgroundColor: "#000",
      color: "#fff",
    },
    button: {
      backgroundColor: "#9370DB",
      padding: 10,
      borderRadius: 4,
      marginBottom: 20,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
    imagePreview: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      marginBottom: 20,
    },
    errorText: {
      fontSize: 16,
      color: "#FF6347",
      marginBottom: 10,
    },
  });
  
  export default EditListing;

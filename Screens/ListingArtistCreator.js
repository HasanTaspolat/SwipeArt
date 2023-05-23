import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/app";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import "firebase/firestore";
import { db } from "../components/config";

import { auth, database } from "../firebase";
import { Surface, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import normalize from "react-native-normalize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../components/config"; // Modify the path to your Firebase config
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../components/config";

const ListingArtistCreator = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [count, setCount] = useState();

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };
  const addProduct = async () => {
    // No need to call pickImage here, because it is called separately by the button
    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const collectionRef = collection(database, "users", uid, "listings");

      await addDoc(collectionRef, {
        title,
        desc,
        image,
      });
      setTitle("");
      setDesc("");
      setImage(null);
      setCount("Listing is added!");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(
      storage,
      "listingImages/" + Math.random().toString(36).substring(2, 15)
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      const url = await uploadImageToFirebase(result.assets[0].uri);
      setImage(url);  // Store the URL in state so it can be used in addProduct
    } else {
      throw new Error("Image picking was cancelled");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={handlePress}
        />
      </TouchableOpacity>

      <View style={styles.formWrapper}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title here"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          style={styles.input}
          placeholder="Enter description here"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Listing Image</Text>
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.imageText}>
        {image}
      </Text>

      <TouchableOpacity style={styles.button} onPress={addProduct}>
        <Text style={styles.buttonText}>Add Listing</Text>
      </TouchableOpacity>

      <TextInput value={count} onChangeText={setCount} style={styles.counter} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 18,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 8,
  },
  input: {
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "70%",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageText: {
    color: "#fff",
    marginVertical: 10,
    marginLeft: 10,
  },
  counter: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default ListingArtistCreator;

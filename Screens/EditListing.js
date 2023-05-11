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

  const handleEditListing = async () => {
    try {
      setError("");
      setLoading(true);
      const listingRef = doc(database, "listings", route.params.id);
      await setDoc(
        listingRef,
        { title, desc, image, visible },
        { merge: true }
      );
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

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
        <Text style={styles.imageButtonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={handleEditListing}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Save"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.visibilityButton} onPress={toggleVisible}>
        <Ionicons name={visible ? "eye" : "eye-off"} size={24} color="white" />
        <Text style={styles.visibilityText}>
          {visible ? "Visible" : "Hidden"}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  back: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  visibilityButton: {
    textAlign: "center",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "white",
    color: "black",
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    width: "100%",
    marginBottom: 20,
    color: "white",
  },
  imageButtonText: {
    textAlign: "center",
    color: "white",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default EditListing;

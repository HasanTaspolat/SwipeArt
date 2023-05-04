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
} from "firebase/firestore";
import { auth, database } from "../firebase";
import { Surface, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import normalize from "react-native-normalize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ListingArtistCreator = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [count, setCount] = useState();

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };

  const addProduct = async () => {
    addDoc(collection(database, "listings"), {
      title,
      desc,
      image,
    });
    setTitle("");
    setDesc("");
    setImage(null);
    setCount("Listing is added!");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.header2}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={handlePress}
        />
      </TouchableOpacity>

      <Text style={styles.text}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title here"
        placeholderTextColor="#999"
      />
      <Text style={styles.text}>Description:</Text>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
        placeholder="Enter description here"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.button}
        title="Upload Image"
        onPress={pickImage}
      >
        <Text style={styles.text}> Upload Listing Image </Text>
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textImage}>
        {image}
      </Text>
      <TouchableOpacity
        style={styles.button}
        title="Add Listing"
        onPress={addProduct}
      >
        <Text style={styles.text}> Add Listing </Text>
      </TouchableOpacity>

      <TextInput value={count} onChangeText={setCount} style={styles.text2} />
    </View>
  );
};

const styles = StyleSheet.create({
  header2: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  button: {
    borderRadius: normalize(10),
    borderColor: "gray",
    borderWidth: 1,
    marginTop: normalize(10),
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  goBack: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    color: "white",
  },
  text2: {
    color: "white",
    marginTop: 10,
  },
  textImage: {
    color: "white",
    width: 150,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "50%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    color: "white",
  },
});

export default ListingArtistCreator;

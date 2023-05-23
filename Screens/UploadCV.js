import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../components/config";
import ChooseScreenFirst from "./ChooseScreenFirst";

import * as FileSystem from "expo-file-system";
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../components/config";

export default function UploadCV({ navigation }) {
  const [cv, setCv] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(
      storage,
      "images/" + Math.random().toString(36).substring(2, 15)
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
  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const url = await uploadImageToFirebase(result.assets[0].uri);
      setCv(url);

      console.log(cv);
      await updateDoc(doc(db, "users", uid), {
        cv: url,
      });

   
    }
    alert("Uploaded Successfully!");
    navigation.navigate(ChooseScreenFirst);
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.buttonPhoto}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          handleChoosePhoto();
        }}
      >
        <Text style={styles.buttonText}> Upload CV/Resume ( as Image )</Text>
      </TouchableHighlight>

      {uploading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "rgba(29, 15, 154, 0.8)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 220,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

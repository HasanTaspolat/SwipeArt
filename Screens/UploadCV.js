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
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";

export default function UploadCV({ navigation }) {
  const [cv, setCv] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  /*   const selectOneFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setCv(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
 */
  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setCv(result.assets[0].uri);
    }
    console.log(cv);
    await updateDoc(doc(db, "users", uid), {
      cv: result.assets[0].uri,
    });

    alert("Uploaded Successfully!");
    navigation.navigate(ChooseScreenFirst);
  };


  /*   const uploadFile = async () => {
    if (cv == null) return;
    setUploading(true);

    const base64 = await FileSystem.readAsStringAsync(cv, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await updateDoc(doc(db, "users", uid), {
      cv: base64,
    });

    setBase64Image(`data:image/jpeg;base64,${base64}`); // Save the base64 data

    setCv(null);
    setUploading(false);
    alert("Uploaded Successfully!");
    navigation.navigate(ChooseScreenFirst);
  }; */

  return (
    <View style={styles.container}>
      {/*     <TouchableOpacity style={styles.button} onPress={selectOneFile}>
        <Text style={styles.buttonText}> Select CV/Resume</Text>
        {cv && <Image source={{ uri: cv }} style={styles.previewImage} />}
      </TouchableOpacity> */}

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

      {/*       {base64Image && (
        <WebView
          originWhitelist={["*"]}
          source={{ html: `<img src="${base64Image}" />` }}
          style={{
            marginTop: 20,
            maxHeight: 600,
            width: 500,
            backgroundColor: "white",
          }}
        />
      )} */}

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

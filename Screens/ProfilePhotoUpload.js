import { useState } from "react";
import { View, Image, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../components/config"; // Modify the path to your Firebase config

// Initialize Firebase
const storage = getStorage(firebaseConfig);

const ProfilePhotoUpload = () => {
  const [photoURL, setPhotoURL] = useState("");

  const handleChoosePhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        const { uri, name } = result;

        // Create a reference to the Firebase storage location
        const storageRef = ref(storage, "profilePhotos/" + name);

        // Upload the selected image file to Firebase storage
        const snapshot = await uploadBytes(storageRef, uri);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("Profile photo download URL: ", downloadURL);
        setPhotoURL(downloadURL); // Save the photo URL in state or use it as needed
      }
    } catch (error) {
      console.log("Error choosing profile photo: ", error);
    }
  };

  return (
    <View>
      {photoURL ? (
        <Image source={{ uri: photoURL }} style={{ width: 200, height: 200 }} />
      ) : (
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      )}
    </View>
  );
};

export default ProfilePhotoUpload;

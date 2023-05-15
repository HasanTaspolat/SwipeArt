import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import BottomNavigationArtist from "./BottomNavigationArtist";
import normalize from "react-native-normalize";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "../firebase";

const EditProfileScreen = ({ navigation }) => {
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Your statements!");
  const [imageUri, setImageUri] = useState(
    "https://i.stack.imgur.com/dr5qp.jpg"
  );
  const [documentUri, setDocumentUri] = useState("");
  const [facebook, setFacebook] = useState("https://facebook.com/");
  const [twitter, setTwitter] = useState("https://twitter.com/");
  const [instagram, setInstagram] = useState("https://instagram.com/");
  const [base64Src, setBase64Src] = useState(null);
  const [data, setData] = useState([]);
  const [job, setJob] = useState("");

  const handleSave = () => {
    setEditingMode(false);
    // Save changes to user profile
  };

  const displayDocument = async (res) => {
    try {
      console.log("selam fourth");
    } catch (e) {
      // error
    }
  };

  useEffect(() => {
    const q = query(collection(database, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs.find((item) => item.id === auth.currentUser.uid);
      console.log("current name", currentUser);
      setData(docs);
      setName(currentUser.nameSurname);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(database, "users", auth.currentUser.uid, "artistPreference")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs_pref = [];
      querySnapshot.forEach((doc) => {
        docs_pref.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs_pref.find(
        (item) => item.id === auth.currentUser.uid
      );
      // console.log("artistPreference data", docs_pref);
      console.log("sss:", docs_pref[0].id);
      setData(docs_pref);
      setJob(docs_pref[0].id);
    });
    return () => unsubscribe();
  }, []);

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
  };

  const handleDocumentUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === "success") {
      setDocumentUri(result.uri);
    }
  };

  return (
    <View  style={styles.container}>
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
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>Bio</Text>
          <TextInput style={styles.input} value={bio} onChangeText={setBio} />
          <Text style={styles.label}>Document (PDF)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleDocumentUpload}
          >
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
            {/*    <TouchableOpacity onPress={() => Linking.openURL(facebook)}>
              <Feather name="facebook" size={20} color="white" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => Linking.openURL(twitter)}>
              <Feather
                style={styles.socialLinks2}
                name="twitter"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
              <Feather
                style={styles.socialLinks2}
                name="instagram"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomTexts}>
            <Text style={styles.statCount}>Job: {job}</Text>
            <Text style={styles.statCount}>Job: {job}</Text>
            <Text style={styles.statCount}>Job: {job}</Text>
            <Text style={styles.statCount}>Job: {job}</Text>
            <Text style={styles.statCount}>Job: {job}</Text>

          </View>
          {/*   {documentUri ? (
            <TouchableOpacity onPress={() => displayDocument()}>
              <Text style={styles.documentLink}>View Document</Text>
            </TouchableOpacity>
          ) : null} */}
        </View>
      )}
      <BottomNavigationArtist
        style={styles.BottomNavigationArtistContainer}
      ></BottomNavigationArtist>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  BottomNavigationArtistContainer: {
    paddingTop: normalize(150),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 16,
    color: "white",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  editText: {
    color: "#5769FA",
    fontWeight: "bold",
    marginTop: 40,
  },
  saveText: {
    color: "red",
    fontWeight: "bold",
    marginTop: 40,
  },
  imageContainer: {
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "white",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  uploadText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  profileInfo: {
    alignItems: "center",
    padding: 16,
    color: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  bio: {
    fontSize: 16,
    marginBottom: 16,
    color: "white",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
  },

  socialLinks2: {
    marginLeft: 10,
    marginBottom: 16,
  },
  documentLink: {
    color: "white",
    textDecorationLine: "underline",
  },
  documentUri: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
});

export default EditProfileScreen;

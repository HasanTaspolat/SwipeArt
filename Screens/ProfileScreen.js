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
import { WebView } from "react-native-webview";
import * as Font from "expo-font";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import BottomNavigationArtist from "./BottomNavigationArtist";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/FontAwesome";
import storage from "../components/config";

import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, database, firebase } from "../firebase";
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// for the font style
const customFonts = {
  circular: require("../assets/circular.ttf"),
};

async function loadFonts() {
  await Font.loadAsync(customFonts);
}

loadFonts();
// for the font style

const EditProfileScreen = ({ navigation }) => {
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageUri, setImageUri] = useState(
    "https://i.stack.imgur.com/dr5qp.jpg"
  );
  const [cv, setCV] = useState("");
  const [documentUri, setDocumentUri] = useState("");
  const [base64Src, setBase64Src] = useState(null);
  const [data, setData] = useState([]);
  const [job, setJob] = useState("");
  const [genre, setGenre] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [behance, setBehance] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [ImageURI, setImageURI] = useState("");
  const [username, setUsername] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    twitter: twitter,
    instagram: instagram,
    linkedin: linkedin,
    behance: behance,
  });

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia((prevState) => ({
      ...prevState,
      [platform]: value,
    }));
  };
  //const string = selectedGenre.join(", ");
  const handleSave = () => {
    setEditingMode(false);
    /*    setDoc(doc(database, "users", auth.currentUser.uid, "profile", "bio"), {
      socialMedia: socialMedia,
    })
      .then(() => {
        // console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log("error");
      }); */

    updateDoc(doc(database, "users", auth.currentUser.uid), {
      bio: bio,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  };

  useEffect(() => {
    const q = query(collection(database, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs.find((item) => item.id === auth.currentUser.uid);
      //console.log(currentUser);
      setImageURI(currentUser.photoURL);
      setBio(currentUser.bio);
      setBehance(currentUser.socialMedia.behance);
      setTwitter(currentUser.socialMedia.twitter);
      setInstagram(currentUser.socialMedia.instagram);
      setLinkedin(currentUser.socialMedia.linkedin);
      setUsername(currentUser.username);
      setCV(currentUser.cv);
      const handleSocialMediaChange = (platform, value) => {
        //  console.log("yes");
        setSocialMedia((prevState) => ({
          ...prevState,
          [platform]: value,
        }));
      };

      handleSocialMediaChange("twitter", twitter);
      // console.log(socialMedia);
      setData(docs);
      setName(currentUser.nameSurname);

      setDoc(doc(database, "users", auth.currentUser.uid, "profile", "bio"), {
        bio: bio,
      })
        .then(() => {
          //console.log("data submitted");
        })
        .catch((error) => {
          // The write failed...
          console.log("error");
        });
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
      //console.log("artistPreference data", docs_pref);
      // console.log("sss:", docs_pref[0]);
      setData(docs_pref);
      setJob(docs_pref[0].id);
      console.log("docs_pref_pref", docs_pref[2]);
      const handleProfessionSelect = (profession) => {
        if (selectedProfessions.includes(profession)) {
        } else {
          setSelectedProfessions([...selectedProfessions, profession]);
        }
      };
      const handleGenreSelect = (genre) => {
        if (selectedGenre.includes(genre)) {
        } else {
          setSelectedGenre([...selectedGenre, genre]);
        }
      };

      if (docs_pref[0].id === "Musician") {
        if (docs_pref[1].composer === 1) {
          handleProfessionSelect("Composer");
        }
        if (docs_pref[1].engineer === 1) {
          handleProfessionSelect("Sound Engineer");
        }
        if (docs_pref[1].producer === 1) {
          handleProfessionSelect("Producer");
        }
        if (docs_pref[1].vocalist === 1) {
          handleProfessionSelect("Vocalist");
        }
        if (docs_pref[2].blues === 1) {
          handleGenreSelect("Blues");
        }
        if (docs_pref[2].edm === 1) {
          handleGenreSelect("EDM");
        }
        if (docs_pref[2].pop === 1) {
          handleGenreSelect("Pop");
        }
        if (docs_pref[2].rap === 1) {
          handleGenreSelect("Rap");
        }
        if (docs_pref[2].rock === 1) {
          handleGenreSelect("Rock");
        }
      }

      if (docs_pref[0].id === "Painter") {
        if (docs_pref[0].digitalDesignScore === 1) {
          handleProfessionSelect("Digital Design");
        } else if (docs_pref[0].graffitiScore === 1) {
          handleProfessionSelect("Graffiti");
        } else if (docs_pref[0].industrialScore === 1) {
          handleProfessionSelect("Industrial Design");
        } else if (docs_pref[0].restorationScore === 1) {
          handleProfessionSelect("Restoration");
        }
      }
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

    updateDoc(doc(database, "users", auth.currentUser.uid), {
      photoURL: result.assets[0].uri,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  };

  //console.log(storage);
  const handleDocumentUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === "success") {
      documentUri = result.uri;

      // Upload the document to Firebase Storage
      const storageRef = ref(getStorage(), `/files/${documentUri}`);
      const uploadTask = uploadBytesResumable(storageRef, documentUri);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            // Get the download URL of the uploaded document
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Update the CV information in the Firestore document
            await updateDoc(doc(database, "users", auth.currentUser.uid), {
              cv: downloadURL,
            });
            setCV(cv);

            console.log("CV document uploaded and updated successfully");
          } catch (error) {
            console.log("Error uploading CV document:", error);
          }
        }
      );
    }
  };

  const handleDocumentView = async () => {
    console.log(cv);
    if (cv) {
      try {
        // Share the document using the Expo Sharing module
        await Sharing.shareAsync(cv);
      } catch (error) {
        console.error("Error sharing document:", error);
      }
    }
  };
  //console.log("social", socialMedia.behance);

  return (
    <View style={styles.container}>
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
          <Image
            source={
              ImageURI
                ? { uri: ImageURI }
                : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {editingMode ? (
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={styles.input} value={bio} onChangeText={setBio} />
            <Text style={styles.label}>Document</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleDocumentUpload}
            >
              <Feather name="upload" size={24} color="white" />
              <Text style={styles.uploadText}>Upload document</Text>
            </TouchableOpacity>

            {/*     {behance !== "" && ( */}
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("behance", value)
              }
              placeholder="Behance URL"
              placeholderTextColor="#ffff"
            />
            {/*      )} */}

            {/*  {twitter !== "" && ( */}
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("twitter", value)
              }
              placeholder="Twitter URL"
              placeholderTextColor="#ffff"
            />
            {/*  )} */}

            {/*    {instagram !== "" && ( */}
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("instagram", value)
              }
              placeholder="Instagram URL"
              placeholderTextColor="#ffff"
            />
            {/*    )} */}

            {/* {linkedin !== "" && ( */}
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("linkedin", value)
              }
              placeholder="Linkedin URL"
              placeholderTextColor="#ffff"
            />
            {/*    )} */}
          </ScrollView>
        ) : (
          <ScrollView style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio}>@{username}</Text>
            <Text style={styles.bio}>{bio}</Text>
            <View style={styles.socialLinks}>
              {behance !== "" && (
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => Linking.openURL(behance)}>
                    <Icon
                      style={styles.socialMediaIcon}
                      name="behance"
                      size={25}
                      color="#1769FF"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {twitter !== "" && (
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => Linking.openURL(twitter)}>
                    <Icon
                      style={styles.socialMediaIcon}
                      name="twitter"
                      size={25}
                      color="#1DA1F2"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {instagram !== "" && (
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
                    <Icon
                      style={styles.socialMediaIcon}
                      name="instagram"
                      size={25}
                      color="#C13584"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {linkedin !== "" && (
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
                    <Icon
                      style={styles.socialMediaIcon}
                      name="linkedin"
                      size={25}
                      color="#0077B5"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/*    <TouchableOpacity
              style={styles.uploadButton2}
              onPress={handleDocumentView}
            >
              <Feather name="download" size={24} color="white" />
              <Text style={styles.uploadText}>Download document</Text>
            </TouchableOpacity> */}
            <Text style={styles.noText}></Text>
            {job === "Musician" && (
              <View style={styles.bottomTexts2}>
                <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}>Job: </Text>
                  <Text style={styles.bottomText}>{job}</Text>
                </View>
                <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}> Profession: </Text>
                  {selectedProfessions.map((profession) => (
                    <Text style={styles.bottomText}>{profession}</Text>
                  ))}
                </View>
                <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}>Genre:</Text>
                  <Text style={styles.bottomText}>{selectedGenre}</Text>
                </View>
              </View>
            )}
            {job === "Painter" && (
              <View style={styles.bottomTexts2}>
                <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}>Job: </Text>
                  <Text style={styles.bottomText}>{job}</Text>
                </View>
                <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}> Profession: </Text>
                  {selectedProfessions.map((profession) => (
                    <Text style={styles.bottomText}>{profession}</Text>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </View>
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
  contentContainer: {
    flex: 1, // Take up remaining vertical space
  },
  iconContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontFamily: "circular",
  },
  editText: {
    color: "#5769FA",
    fontWeight: "bold",
    fontFamily: "circular",
  },
  saveText: {
    color: "#5769FA",
    fontWeight: "bold",
    fontFamily: "circular",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "white",
  },
  form: {
    flex: 1, // Take up available space within the content container
    padding: 16,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "circular",
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginTop: 8,
    borderColor: "#ddd",
    color: "white",
    fontFamily: "circular",
    padding: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#5769FA",
  },
  uploadButton2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#5769FA",
  },
  uploadText: {
    marginLeft: 10,
    color: "white",
    fontFamily: "circular",
  },
  noText: {
    color: "white",
    fontFamily: "circular",
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  documentUri: {
    color: "white",
    marginTop: 10,
  },
  profileInfo: {
    padding: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontFamily: "circular",
    alignItems: "center",
  },
  bio: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "circular",
    marginVertical: 8,
  },
  socialLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  socialLinks2: {
    marginLeft: 10,
    fontFamily: "circular",
  },
  bottomTexts: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 36, 36, 0.62)",
    width: "100%",
    borderColor: "rgba(197, 197, 197, 0.62)",
    borderWidth: 1,
    fontFamily: "circular",
    paddingHorizontal: 40,
  },
  bottomTexts2: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    fontFamily: "circular",
  },
  bottomText: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
    paddingVertical: 10,
    fontFamily: "circular",
  },
});

export default EditProfileScreen;

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
import BottomNavigationCustomer from "./BottomNavigationCustomer";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/FontAwesome";
import storage from "../components/config";
import { db } from "../components/config";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
  setDoc,
  getDocs,
  where,
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

const ProfileScreenCustomer = ({ navigation }) => {
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [documentUri, setDocumentUri] = useState("");
  const [base64Src, setBase64Src] = useState(null);
  const [data, setData] = useState([]);
  const [job, setJob] = useState("");
  const [genre, setGenre] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [ImageURI, setImageURI] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [behance, setBehance] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [favorites, setFavorites] = useState([]);

  const [socialMedia, setSocialMedia] = useState({
    twitter: twitter,
    instagram: instagram,
    linkedin: linkedin,
    behance: behance,
  });

  //console.log(favorites);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userUid = auth.currentUser.uid;
        const favoriteRef = doc(database, "favorites", userUid);
        const favoriteSnap = await getDoc(favoriteRef);
        let favoritesArray = [];
        if (favoriteSnap.exists()) {
          const favorite = favoriteSnap.data();

          for (let i = 0; i < favorite.artists.length; i++) {
            const artistRef = doc(database, "users", favorite.artists[i]);
            const artistSnap = await getDoc(artistRef);

            if (artistSnap.exists() && artistSnap.data().isArtist === 1) {
              const artistData = artistSnap.data();
              favoritesArray.push({
                id: artistData.useruid,
                nameSurname: artistData.nameSurname,
                username: artistData.username,
                email: artistData.email,
              });
            }
          }
        }

        setFavorites(favoritesArray);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchFavorites();
  }, [auth.currentUser.uid]);

  //console.log(favorites);

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
      setUsername(currentUser.username);
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
      collection(database, "favorites", auth.currentUser.uid, "userPreference")
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
      //console.log("sss:", docs_pref[0]);
      setData(docs_pref);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(database, "users", auth.currentUser.uid, "userPreference")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs_pref = [];
      querySnapshot.forEach((doc) => {
        docs_pref.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs_pref.find(
        (item) => item.id === auth.currentUser.uid
      );
      /*  console.log("artistPreference data", docs_pref);
      console.log("sss:", docs_pref[0]); */
      setData(docs_pref);

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

      if (docs_pref[0].id === "MusicianTypes") {
        setLookingFor("Musician");
        if (docs_pref[0].composerScore === 1) {
          handleProfessionSelect("Musician");
        }
        if (docs_pref[0].rap === 1) {
          handleGenreSelect("Blues");
        }
        if (docs_pref[0].rock === 1) {
          handleGenreSelect("EDM");
        }
        if (docs_pref[0].pop === 1) {
          handleGenreSelect("Pop");
        }
        if (docs_pref[0].edm === 1) {
          handleGenreSelect("Rap");
        }
        if (docs_pref[0].blues === 1) {
          handleGenreSelect("Rock");
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

  const removeFromFavorites = async (artistId) => {
    try {
      const userUid = auth.currentUser.uid;
      const favoriteRef = doc(database, "favorites", userUid);
      const favoriteSnap = await getDoc(favoriteRef);

      if (favoriteSnap.exists()) {
        const favorite = favoriteSnap.data();
        // Check if the artist is in the user's favorites
        const index = favorite.artists.indexOf(artistId);
        if (index !== -1) {
          // Remove the artist from the user's favorites
          favorite.artists.splice(index, 1);
          await updateDoc(favoriteRef, {
            artists: favorite.artists,
          });

          // Also update the local state
          const newFavorites = favorites.filter(
            (artist) => artist.id !== artistId
          );
          setFavorites(newFavorites);

          console.log("Artist removed from user's favorites.");
        } else {
          console.log("Artist is not in user's favorites.");
        }
      } else {
        console.log("Favorites document does not exist.");
      }
    } catch (error) {
      console.error("Error removing artist from user's favorites:", error);
    }
  };

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
        {/*   <TouchableOpacity onPress={handleImageUpload}>
          <Image
            source={
              ImageURI
                ? { uri: ImageURI }
                : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
            }
            style={styles.image}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.contentContainer}>
        {editingMode ? (
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={styles.input} value={bio} onChangeText={setBio} />
            <Text style={styles.label}>Document</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("behance", value)
              }
              placeholder="Behance URL"
              placeholderTextColor="#ffff"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("twitter", value)
              }
              placeholder="Twitter URL"
              placeholderTextColor="#ffff"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("instagram", value)
              }
              placeholder="Instagram URL"
              placeholderTextColor="#ffff"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                handleSocialMediaChange("linkedin", value)
              }
              placeholder="Linkedin URL"
              placeholderTextColor="#ffff"
            />
          </ScrollView>
        ) : (
          <ScrollView style={styles.profileInfo}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImageUpload}
            >
              <Image
                source={
                  ImageURI
                    ? { uri: ImageURI }
                    : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
                }
                style={styles.image}
              />
            </TouchableOpacity>
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
            <View style={styles.bottomTexts2}>
              <View style={styles.bottomTexts}>
                <Text style={styles.bottomText}>Looking For: </Text>
                <Text style={styles.bottomText}>{lookingFor}</Text>
              </View>
              <View style={styles.bottomTexts}>
                <Text style={styles.bottomText}>Genre:</Text>
                <Text style={styles.bottomText}>{selectedGenre}</Text>
              </View>
              <View style={styles.favorCont}>
                <Icon
                  style={styles.starIcon}
                  name="star"
                  size={25}
                  color="yellow"
                />
                <Text style={styles.favTitle}>Favorites:</Text>
              </View>

              <View>
                {favorites.length === 0 ? (
                  <View style={styles.favoriteContainer}>
                    <Text style={styles.favoriteText}>No favorites found.</Text>
                  </View>
                ) : (
                  favorites.map((favorite, index) => (
                    <View key={index} style={styles.favoriteContainer2}>
                      <View>
                        <Text style={styles.favoriteText}>
                          {favorite.nameSurname}
                        </Text>
                        <Text style={styles.favoriteText}>
                          {favorite.username}
                        </Text>
                        <Text style={styles.favoriteText}>
                          {favorite.email}
                        </Text>
                      </View>

                      <View>
                        <TouchableOpacity style={styles.removeIcon}>
                          <Icon
                            name="remove"
                            size={26}
                            color="red"
                            onPress={() => removeFromFavorites(favorite.id)}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </View>

              {/*  <View style={styles.bottomTexts}>
                  <Text style={styles.bottomText}>Genre:</Text>
                  <Text style={styles.bottomText}>{selectedGenre}</Text>
                </View> */}
            </View>
          </ScrollView>
        )}
      </View>
      <BottomNavigationCustomer
        style={styles.BottomNavigationArtistContainer}
      ></BottomNavigationCustomer>
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
    paddingBottom: 12,
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
    marginTop: 8,
    textAlign: "center",
    fontFamily: "circular",
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
  favTitle: {
    fontSize: 16,
    color: "white",
    paddingVertical: 10,
    fontFamily: "circular",
  },
  favoriteText: {
    fontSize: 16,
    color: "white",
    fontFamily: "circular",
  },
  favoriteContainer: {
    margin: 4,
    marginLeft: 15,
  },
  favoriteContainer2: {
    margin: 4,
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  favorCont: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "circular",
    alignItems: "center",
    margin: 15,
    borderBottomColor: "white",
    borderWidth: 1,
    width: 112,
  },
  starIcon: {
    marginRight: 15,
  },
  removeIcon: {
    marginLeft: 15,
  },
});

export default ProfileScreenCustomer;

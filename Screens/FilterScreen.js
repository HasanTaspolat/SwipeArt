import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  FlatList,
  Linking,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import SwipeCard from "./SwipeCard";
import data from "../person.json";
import { AntDesign } from "@expo/vector-icons";
import BottomNavigationCustomer from "./BottomNavigationCustomer";
import { getAuth } from "firebase/auth";
import OpenSwipeAnimation from "./OpenSwipeAnimation";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import IconIcon from "react-native-vector-icons/FontAwesome5";
import { db } from "../components/config";
import { useNavigation } from "@react-navigation/native";

export default function FilterScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [dataJob, setDataJob] = useState([]);
  const [musicianJob, setMusicianJob] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameListing, setNameListing] = useState("");
  const [currentArtistID, setcurrentArtistID] = useState("");
  const [showCVModal, setShowCVModal] = useState(false);
  const [CVImageUrl, setCVImageUrl] = useState("");

  async function fetchSearchResults() {
    try {
      const docSnap = await getDocs(
        query(collection(db, "users"), where("username", "==", searchTerm))
      );

      let searchedUser = [];
      docSnap.forEach((doc) => {
        searchedUser.push({ ...doc.data(), id: doc.id });
      });

      setSearchResults(searchedUser);
      setFilterArr(searchedUser);

      //console.log("filterArr", filterArr);

      if (searchedUser[0].isCustomer === 1) {
        setSearchResults([]);
        setFilterArr([]);
        return null;
      } else {
        setNameListing(searchedUser[0].nameSurname);
        setcurrentArtistID(searchedUser[0].id);
        return searchedUser[0].id;
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      return null;
    }
  }
  // console.log(searchResults);

  async function listingFetchs(userId) {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "listings")
      );
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
      console.log("docsdocs", docs);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  async function listingJob(userId) {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "artistPreference")
      );
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      setDataJob(docs);
      //  console.log("docsdocs", docs);
      // console.log("SELAM", dataJob);
      if (docs[1].composer) {
        setMusicianJob("Composer");
      } else if (docs[1].engineer === 1) {
        setMusicianJob("Sound Engineer");
      } else if (docs[1].producer === 1) {
        setMusicianJob("Producer");
      } else if (docs[1].vocalist === 1) {
        setMusicianJob("Vocalist");
      } else {
        setMusicianJob("Painter");
      }
    } catch (error) {
      console.error("Error fetching artist preferences:", error);
    }
  }

  // console.log("CVImageUrl", CVImageUrl);
  const sendFriendRequest = async () => {
    try {
      const senderRef = doc(db, "users", uid);
      const receiverRef = doc(db, "users", filterArr[0].id); // Replace with the actual receiver's user ID
      const senderSnap = await getDoc(senderRef);
      const receiverSnap = await getDoc(receiverRef);
      /* console.log(senderRef);
      console.log(receiverRef); */
      if (senderSnap.exists() && receiverSnap.exists()) {
        const sender = senderSnap.data();
        const receiver = receiverSnap.data();
        // Check if the friend request already exists
        const requestQuery = query(
          collection(db, "friendRequests"),
          where("senderId", "==", uid),
          where("receiverId", "==", filterArr[0].id) // Replace with the actual receiver's user ID
        );
        const requestSnap = await getDocs(requestQuery);

        if (requestSnap.empty) {
          // Create a new friend request
          await addDoc(collection(db, "friendRequests"), {
            senderId: uid,
            receiverId: filterArr[0].id, // Replace with the actual receiver's user ID
          });
          console.log("Friend request sent.");
        } else {
          console.log("Friend request already sent.");
        }
      } else {
        console.log("Sender or receiver does not exist.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const addToFavorites = async () => {
    try {
      const userRef = doc(db, "users", uid);
      const favoriteRef = doc(db, "favorites", uid);
      const userSnap = await getDoc(userRef);
      const favoriteSnap = await getDoc(favoriteRef);

      if (userSnap.exists()) {
        const user = userSnap.data();
        const artistId = filterArr[0].id;
        if (favoriteSnap.exists()) {
          const favorite = favoriteSnap.data();
          // Check if the artist is already in the user's favorites
          if (!favorite.artists.includes(artistId)) {
            // Add the artist to the user's favorites
            await updateDoc(favoriteRef, {
              artists: [...favorite.artists, artistId],
            });
            console.log("Artist added to user's favorites.");
          } else {
            console.log("Artist is already in user's favorites.");
          }
        } else {
          // Create a new favorites document for the user with the artist
          await setDoc(favoriteRef, {
            artists: [artistId],
          });
          console.log("Favorites document created with artist added.");
        }
      } else {
        console.log("User does not exist.");
      }
    } catch (error) {
      console.error("Error adding artist to user's favorites:", error);
    }
  };
  async function handleSearch() {
    const userId = await fetchSearchResults(searchTerm);
    if (userId) {
      await listingFetchs(userId);
      await listingJob(userId);
    }
    setModalVisible(true);
  }
  const handleClose = () => {
    setModalVisible(false);
  };

  const viewImage = (uri) => {
    setSelectedImage(uri);
  };

  const handlePressCustomerFriend = () => {
    navigation.navigate("FriendStatCustomer");
  };

  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}
      >
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Artist"
          placeholderTextColor="#ffff"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <Text style={styles.name}>
        You can search artist from here by using username!
      </Text>
      <View>
        <Text style={styles.bio2}>Your Request Status</Text>
        <TouchableOpacity style={styles.buttonFire}>
          <IconIcon
            name="user"
            size={20}
            style={styles.icon3}
            color="#fff"
            onPress={() => handlePressCustomerFriend()}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleClose}
        style={styles.allModal}
        transparent={true} // Make the modal background transparent
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>

          {searchResults.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No person found with the entered username.
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Image
                    source={
                      item.photoURL
                        ? { uri: item.photoURL }
                        : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
                    }
                    style={styles.cardImage}
                  />
                  <Text style={styles.name}>{item.nameSurname}</Text>
                  <Text style={styles.bio}>{item.bio}</Text>
                  <Text style={styles.info}>@{item.username}</Text>
                  <Text style={styles.info}>{item.email}</Text>
                  <Text style={styles.info}>{musicianJob}</Text>

                  <View style={styles.icont}>
                    <TouchableOpacity
                      style={styles.iconticons}
                      onPress={() => sendFriendRequest(item.id)}
                    >
                      <Icon
                        style={styles.socialMediaIcon}
                        name="user-plus"
                        size={25}
                        color="#ffff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconticons}
                      onPress={() => addToFavorites(item.id)}
                    >
                      <Icon
                        style={styles.socialMediaIcon}
                        name="star"
                        size={25}
                        color="#ffff"
                      />
                    </TouchableOpacity>
                  </View>

                  {item.cv && (
                    <View style={styles.iconContainer}>
                      <TouchableOpacity
                        style={styles.viewCv}
                        onPress={() => {
                          setCVImageUrl(item.cv);
                          setShowCVModal(true);
                        }}
                      >
                        <Text style={styles.view}>View CV</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {showCVModal && (
                    <Modal
                      visible={showCVModal}
                      transparent={true}
                      style={styles.allModal}
                      onRequestClose={() => setShowCVModal(false)}
                    >
                      <View style={styles.modalContainer}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setShowCVModal(false)}
                        >
                          <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.cvContainer}>
                          <Text style={styles.info3}>CV of {nameListing} </Text>
                          <Image
                            source={{ uri: CVImageUrl }}
                            style={styles.cvImage}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </Modal>
                  )}

                  <View style={styles.startFilter}>
                    {item.behance !== "" && (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.behance)}
                        >
                          <Icon
                            style={styles.socialMediaIcon}
                            name="behance"
                            size={25}
                            color="#1769FF"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.twitter !== "" && (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.twitter)}
                        >
                          <Icon
                            style={styles.socialMediaIcon}
                            name="twitter"
                            size={25}
                            color="#1DA1F2"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.instagram !== "" && (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.instagram)}
                        >
                          <Icon
                            style={styles.socialMediaIcon}
                            name="instagram"
                            size={25}
                            color="#C13584"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.linkedin !== "" && (
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.linkedin)}
                        >
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

                  <Text style={styles.listingName}>
                    {nameListing}'s listings
                  </Text>

                  {data.length === 0 ? (
                    <View>
                      <Text style={styles.bio2}>
                        There are no listings of {nameListing}
                      </Text>
                      <Text style={styles.bio2}>Please check again later!</Text>
                    </View>
                  ) : (
                    data.map((item) => (
                      <View style={styles.listingcontainer} key={item.id}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.bio}>
                            Listing Title: {item.title}
                          </Text>
                          <View style={styles.iconsContainer}></View>
                          <Text style={styles.bio}>
                            Listing Desc: {item.desc}
                          </Text>

                          <View style={styles.allImage}>
                            <Text style={styles.bio}>Image Preview:</Text>
                            <Image
                              source={{ uri: item.image }}
                              style={styles.listingImage}
                            />
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            />
          )}
        </View>
      </Modal>
      <BottomNavigationCustomer
        style={styles.naviationContainer}
      ></BottomNavigationCustomer>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  listingcontainer: {
    margin: 10,
    borderWidth: 2,
    borderBottomColor: "white",
    textAlign: "center",
  },
  listingName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  cardImage2: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
  },
  startFilter: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    flexDirection: "column",
    paddingHorizontal: 55,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  card2: {
    flexDirection: "column",
    paddingHorizontal: 55,
    width: 400,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  shown: {
    fontSize: 16,
    fontWeight: "thin",
    color: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 300,
    marginRight: "auto",
    marginLeft: "auto",
  },
  profession: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  button: {
    width: 50,
    padding: 10,
    position: "absolute",
    left: "30%",
    backgroundColor: "red",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    width: 50,
    padding: 10,
    position: "absolute",
    right: "30%",
    backgroundColor: "green",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    color: "white",
  },
  flatlist: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)", // Semi-transparent background color
    borderColor: "gray",
    borderWidth: 1,
  },
  allModal: { backgroundColor: "black" },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: "black",
  },
  viewCv: {
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
    backgroundColor: "rgba(4, 56, 253, 0.8)",
  },
  view: {
    color: "white",
    fontWeight: "bold",
  },

  flatlist: {
    flex: 1,
    backgroundColor: "#000",
  },
  listItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  startFilter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    margin: 10,
    textAlign: "center",
  },
  bio: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  noResultsText: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
  noResultsContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  bio2: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  info3: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  cvContainer: {
    fontSize: 14,
    color: "#fff",
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center",
  },
  socialLinks: {
    flexDirection: "row",
  },
  iconContainer: {
    margin: 10,
  },
  icon3: {
    padding: 10,
    textAlign: "center",
  },
  buttonFire: {
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "rgba(24, 20, 168, 1)",
    marginTop: 15,
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  icont: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
  },
  iconticons: {
    marginHorizontal: 10,
  },
  socialMediaIcon: {
    width: 30,
    height: 25,
  },
});

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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SwipeCard from "./SwipeCard";
import data from "../person.json";
import { AntDesign } from "@expo/vector-icons";
import BottomNavigationCustomer from "./BottomNavigationCustomer";
import { getAuth } from "firebase/auth";
import OpenSwipeAnimation from "./OpenSwipeAnimation";
import normalize from "react-native-normalize";
import { Dimensions } from "react-native";

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
} from "firebase/firestore";
import { db } from "../components/config";
import { useNavigation } from "@react-navigation/native";

export default function SwipeContainer() {
  const navigation = useNavigation();
  const [cards, setCards] = useState();
  const [gestureDy, setGestureDy] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highestPreference, setHigh] = useState();
  const [highestPreference2, setHigh2] = useState();
  const [prefferedType, setType] = useState();
  const [userData, setUser] = useState();
  const [artists, setArtists] = useState([]);
  const [cardNumber, setCardNumber] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // changed initial value to false
  const [counter, setCounter] = useState(0);
  const [artistJob, setArtistJob] = useState();
  const [refresh, refffff] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  useEffect(() => {
    if (counter < 12 && artists.length < 1) {
      const fetchData = async () => {
        try {
          await handlePreCreate();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      //console.log(counter);
      const timer = setTimeout(() => {
        if (counter <= 6) {
          fetchData();
        }
        setCounter((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
    setCards(artists);
    // console.log(artists);
    setDataLoaded(true);
  }, [counter]);

  async function getUserType() {
    let users = [];
    await getDocs(collection(db, "users", uid, "userPreference")).then(
      (docSnap) => {
        let users = [];
        docSnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setUser(users);
      }
    );
  }

  async function handlePreCreate() {
    await getUserType();
    let max = 0;
    let maxindex = 0;
    let max2 = 0;
    let max2index = 0;
    let highKey1;
    let highKey2;
    userData.forEach((product, key) => {
      setType(product.id);
      Object.values(product).map((key, value) => {
        if (key > max) {
          max = key;
          maxindex = value;
        } else if (key > max2 && key <= max) {
          max2 = key;
          max2index = value;
        }
      });
      Object.keys(product).map((key, value) => {
        //  console.log(key, value);
        if (maxindex === value) {
          highKey1 = key;
        }
        if (max2index === value) {
          highKey2 = key;
        }
      });
    });
    setHigh(highKey1);
    setHigh2(highKey2);
    /*   console.log(highestPreference);
    console.log(highestPreference2); */
    await FormArtists();
  }

  async function FormArtists() {
    /*    console.log(highestPreference);
    console.log(highestPreference2); */
    const listedArtists = [];

    await getDocs(
      query(collection(db, "users"), where("isArtist", "==", 1))
    ).then((docSnap) => {
      let artists = [];
      docSnap.forEach((doc) => {
        artists.push({ ...doc.data(), id: doc.id });
      });
      //console.log("artists",artists);

      artists.map((artist) => {
        getDocs(collection(db, "users", artist.id, "artistPreference")).then(
          (docSnap) => {
            docSnap.forEach((doc) => {
              let temp = "";
              let artiststemp = [];
              artiststemp.push({ ...doc.data(), id: doc.id });
              if (artiststemp[0].id.includes("Profession")) {
                const keys = Object.keys(artiststemp[0]);
                Object.values(artiststemp[0]).map((key, value) => {
                  if (key === 1) {
                    let tempkey = keys[value];
                    temp += "" + tempkey + " ";
                    setArtistJob(temp);
                  }
                });
              }
              /*    console.log(artistJob); */
              if (artiststemp[0][highestPreference] === 1) {
                listedArtists.push({
                  artistid: artist.id,
                  bio: artist.bio,
                  socialMedia: artist.socialMedia,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference,
                  photoURL: artist.photoURL,
                  artistjob: temp,
                  username: artist.username,
                });
              } else if (artiststemp[0][highestPreference2] === 1) {
                listedArtists.push({
                  artistid: artist.id,
                  bio: artist.bio,
                  socialMedia: artist.socialMedia,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference2,
                  photoURL: artist.photoURL,
                  artistjob: temp,
                  username: artist.username,
                });
              }
            });
          }
        );
      });

      setArtists(listedArtists);
    });

    /*   console.log(artists); */
  }

  /*   async function fetchSearchResults() {
    await getDocs(
      query(collection(db, "users"), where("userName", "==", searchTerm))
    ).then((docSnap) => {
      let searchedUser = [];
      docSnap.forEach((doc) => {
        searchedUser.push({ ...doc.data(), id: doc.id });
      });

      setSearchResults(searchedUser);
   console.log("searchResults", searchedUser); 

      setFilterArr(searchedUser);
     console.log("filterArr", searchedUser);

      if (filterArr[0].isCustomer === "1") {
        setSearchResults = [];
        setFilterArr = [];
      } else {

      }
    });
  } */
  /*   const sendFriendRequest = async () => {
    try {
      const senderRef = doc(db, "users", uid);
      const receiverRef = doc(db, "users", filterArr[0].id); // Replace with the actual receiver's user ID
      const senderSnap = await getDoc(senderRef);
      const receiverSnap = await getDoc(receiverRef);
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
        } else {
        }
      } else {
      }
    } catch (error) {
    }
  }; */

  /*   const addToFavorites = async () => {
    try {
      const userRef = doc(db, "users", uid);
      const favoriteRef = doc(db, "favorites", filterArr[0].id);
      const userSnap = await getDoc(userRef);
      const favoriteSnap = await getDoc(favoriteRef);

      if (userSnap.exists() && favoriteSnap.exists()) {
        const user = userSnap.data();
        const favorite = favoriteSnap.data();
        // Check if the user is already in the favorite list
        if (!favorite.users.includes(uid)) {
          // Add the user to the favorite list
          await updateDoc(favoriteRef, {
            users: [...favorite.users, uid],
          });
          //console.log("User added to favorites.");
        } else {
      //    console.log("User is already in favorites.");
        }
      } else if (userSnap.exists() && !favoriteSnap.exists()) {
        // Create a new favorite list with the user
        await setDoc(favoriteRef, {
          users: [uid],
        });
       // console.log("Favorite list created with user added.");
      } else {
       // console.log("User or favorite list does not exist.");
      }
    } catch (error) {
    //  console.error("Error adding user to favorites:", error);
    }
  }; */
  async function notifyUser(userId, targetUserId, db) {
    try {
      // Create or update the notification for the user
      const notificationRef = doc(db, "notifications", userId);

      // Set or update the 'viewed' property for the target user
      await setDoc(
        notificationRef,
        {
          [targetUserId]: { viewed: false },
        },
        { merge: true }
      );

      console.log("Notification added successfully");
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  }

  async function setPrefferedArtists() {
    await handlePreCreate();
    await FormArtists();
    // console.log(artists);
  }

  const onSwipeLeft = (cardIndex) => {
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    setCardNumber(newCards);
    console.log("Swiped left on card at index", cardIndex);
  };

  const onSwipeRight = (cardIndex) => {
    const newCards = [...cards];

    notifyUser(newCards[cardIndex].artistid, uid, db);
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    console.log("Swiped right on card at index", cardIndex);
  };

  const hideModal = () => {
    setSelectedCard(null);
  };

  const handleSearch = () => {
    fetchSearchResults(searchTerm);
  };

  if (!dataLoaded) {
    return <OpenSwipeAnimation />;
  } else {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.loginText}>swipeArt.</Text>
        {cards.length > 0 ? (
          cards.map((card, cardIndex) => (
            <TouchableWithoutFeedback key={cardIndex}>
              <SwipeCard
                data={card}
                gestureDy={gestureDy}
                onSwipeLeft={() => onSwipeLeft(cardIndex)}
                onSwipeRight={() => onSwipeRight(cardIndex)}
              >
                <View style={styles.card}>
                  <Image
                    source={
                      card.photoURL
                        ? { uri: card.photoURL }
                        : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
                    }
                    style={styles.cardImage}
                  />

                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{card.nameSurname}</Text>
                    <Text style={styles.profession}>@{card.username}</Text>
                    <Text style={styles.profession}>{card.profession}</Text>
                  </View>
                </View>
              </SwipeCard>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Text style={styles.shown}>All cards have been shown!</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: "100%",
    justifyContent: "center",
    bottom: normalize(280),
  },
  cardImage: {
    width: normalize(200),
    height: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  imageImage: {},
  card: {
    flexDirection: "column",
    paddingHorizontal: normalize(55),
    width: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  card2: {
    flexDirection: "column",
    paddingHorizontal: normalize(55),
    width: 400,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: normalize(16),
  },
  loginText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    right: normalize(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: normalize(14),
    color: "white",
  },
  shown: {
    fontSize: 16,
    fontWeight: "thin",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    top: normalize(220),
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  profession: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  button: {
    width: 50,
    padding: normalize(10),
    position: "absolute",
    left: "30%",
    backgroundColor: "red",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    width: 50,
    padding: normalize(10),
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
    height: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    color: "white",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
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
} from "firebase/firestore";
import { db } from "../components/config";

export default function SwipeContainer() {
  const [cards, setCards] = useState();
  const [gestureDy, setGestureDy] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highestPreference, setHigh] = useState();
  const [highestPreference2, setHigh2] = useState();
  const [prefferedType, setType] = useState();
  const [userData, setUser] = useState();
  const [artists, setArtists] = useState();
  const [cardNumber, setCardNumber] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // changed initial value to false
  const [counter, setCounter] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [artistJob, setArtistJob] = useState();

  useEffect(() => {
    if (counter < 10) {
      const fetchData = async () => {
        try {
          await handlePreCreate();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      console.log(counter);
      const timer = setTimeout(() => {
        fetchData();
        setCounter((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
    setCards(artists);
    //console.log("cards cards cards", cards);
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
        console.log(
          "usersusersusersusersusersusersusersusersusersusersusers",
          users
        );
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
        console.log(key, value);
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
    console.log(highestPreference);
    console.log(highestPreference2);
    await FormArtists();
  }

  async function FormArtists() {
    console.log(highestPreference);
    console.log(highestPreference2);
    await getDocs(
      query(collection(db, "users"), where("isArtist", "==", 1))
    ).then((docSnap) => {
      let artists = [];
      docSnap.forEach((doc) => {
        artists.push({ ...doc.data(), id: doc.id });
      });
      var listedArtists = [];
      artists.map((artist, key) => {
        console.log("artistartistartistartistartistartistartist", artist);
        getDocs(collection(db, "users", artist.id, "artistPreference")).then(
          (docSnap) => {
            docSnap.forEach((doc) => {
              let artiststemp = [];
              artiststemp.push({ ...doc.data(), id: doc.id });
              console.log("doc.data()doc.data()", doc.data());
              console.log("doc.data()doc.data()", doc.data().vocalist);
              // console.log("ARTIST TEMP", artiststemp);
              if (artiststemp[0][highestPreference] === 1) {
                /*       if (doc.data().composer === 1) {
                  console.log("girdi mi");
                  setArtistJob("Composer");
                } else if (doc.data().engineer === 1) {
                  console.log("girdi mi");

                  setArtistJob("Sound Engineer");
                } else if (doc.data().producer === 1) {
                  console.log("girdi mi");

                  setArtistJob("Producer");
                } else if (doc.data().vocalist === 1) {
                  console.log("girdi mi");

                  setArtistJob("Vocalist");
                } */
                listedArtists.push({
                  artistid: artist.id,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference,
                  photoURL: artist.photoURL,
                  artistJob: artistJob,
                });
              }
              if (artiststemp[0][highestPreference2] === 1) {
                listedArtists.push({
                  artistid: artist.id,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference,
                  photoURL: artist.photoURL,
                });
              }
            });
          }
        );
      });
      setArtists(listedArtists);
    });
    console.log(artists);
  }

  async function setPrefferedArtists() {
    await handlePreCreate();
    await FormArtists();
    console.log("bura");
    console.log(artists);
  }

  const onSwipeLeft = (cardIndex) => {
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    //console.log("sııı", newCards);
    setCardNumber(newCards);

    console.log("Swiped left on card at index", cardIndex);
  };

  const onSwipeRight = (cardIndex) => {
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    console.log("sııı", newCards);

    console.log("Swiped right on card at index", cardIndex);
  };

  const hideModal = () => {
    setSelectedCard(null);
  };
  /*   console.log("cardssssssssssssssssssssssssssss", cards);
  console.log(
    "artistJobartistJobartistJobartistJobartistJobartistJobartistJobartistJobartistJobartistJob",
    artistJob
  ); */
  if (!dataLoaded) {
    return <OpenSwipeAnimation />;
  } else {
    return (
      <View style={styles.cardContainer}>
        {cards.length > 0 ? (
          cards.map((card, cardIndex) => (
            <TouchableWithoutFeedback key={cardIndex}>
              <SwipeCard
                data={data}
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
                    <Text style={styles.profession}>{artistJob}</Text>
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
    width: "100%",
    height: "100%",
  },
  cardImage: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
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
});

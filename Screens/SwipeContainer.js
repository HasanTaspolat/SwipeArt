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
  const [artists, setArtists] = useState([]);
  const [cardNumber, setCardNumber] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // changed initial value to false
  const [counter, setCounter] = useState(0);
  const [artistJob,setArtistJob] = useState();
  const [refresh,refffff] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;


  useEffect(() => {
    if (counter < 12 && artists.length < 1) {
      const fetchData = async () => {
        try {
          await handlePreCreate();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      console.log(counter);
      const timer = setTimeout(() => {
        if (counter <= 6) {
          fetchData();
        }
        setCounter((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
    setCards(artists);
    console.log(artists);
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
    const listedArtists = [];
  
    await getDocs(query(collection(db, "users"), where("isArtist", "==", 1))).then((docSnap) => {
      let artists = [];
      docSnap.forEach((doc) => {
        artists.push({ ...doc.data(), id: doc.id });
      });
  
      artists.map((artist) => {
        getDocs(collection(db, "users", artist.id, "artistPreference")).then((docSnap) => {
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
            console.log(artistJob);
            if (artiststemp[0][highestPreference] === 1) {
              listedArtists.push({
                artistid: artist.id,
                bio: artist.bio,
                socialMedia: artist.socialMedia,
                nameSurname: artist.nameSurname,
                profession: highestPreference,
                photoURL: artist.photoURL,
                artistjob: temp 
              });
            }
            if (artiststemp[0][highestPreference2] === 1) {
              listedArtists.push({
                artistid: artist.id,
                bio: artist.bio,
                socialMedia: artist.socialMedia,
                nameSurname: artist.nameSurname,
                profession: highestPreference2,
                photoURL: artist.photoURL,
                artistjob: temp 
              });
            }
          });
        });
      });
  
      setArtists(listedArtists);
    });
  
    console.log(artists);
  }
  async function setPrefferedArtists() {
    await handlePreCreate();
    await FormArtists();
    console.log(artists);
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
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    console.log("Swiped right on card at index", cardIndex);
  };

  const hideModal = () => {
    setSelectedCard(null);
  };

  if (!dataLoaded) {
    return <OpenSwipeAnimation />;
  } else {
    return (
      <View style={styles.cardContainer}>
        {cards.length > 0 ? (
          cards.map((card, cardIndex) => (
            <TouchableWithoutFeedback key={cardIndex}>
              <SwipeCard
                data={artist}
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
                    <Text style={styles.profession}>{card.artistjob}</Text>
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

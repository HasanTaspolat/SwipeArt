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
  const [cards, setCards] = useState(data);
  const [gestureDy, setGestureDy] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highestPreference, setHigh] = useState();
  const [highestPreference2, setHigh2] = useState();
  const [prefferedType, setType] = useState();
  const [userData, setUser] = useState();
  const [artists, setArtists] = useState();
  const [dataLoaded, setDataLoaded] = useState(false); // changed initial value to false
  const [counter, setCounter] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (counter < 10) {
      const fetchData = async () => {
        try {
          await handlePreCreate();
        } catch (error) {
          console.error('Error:', error);
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
    await getDocs(
      query(collection(db, "users"), where("isArtist", "==", 1))
    ).then((docSnap) => {
      let artists = [];
      docSnap.forEach((doc) => {
        artists.push({ ...doc.data(), id: doc.id });
      });
      var listedArtists = [];
      artists.map((artist, key) => {
        getDocs(collection(db, "users", artist.id, "artistPreference")).then(
          (docSnap) => {
            docSnap.forEach((doc) => {
              let artiststemp = [];
              artiststemp.push({ ...doc.data(), id: doc.id });
              if (artiststemp[0][highestPreference] === 1) {
                listedArtists.push({
                  artistid: artist.id,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference,
                });
              }
              if (artiststemp[0][highestPreference2] === 1) {
                listedArtists.push({
                  artistid: artist.id,
                  nameSurname: artist.nameSurname,
                  profession: highestPreference,
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
    // Render a loading state or return null until data is loaded
    return null;
  }


  return (
<View style={styles.cardContainer}>
      {dataLoaded ? (
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
                  source={{
                    uri:
                      'https://media.istockphoto.com/id/1377592015/photo/determined-for-any-challenge.jpg?b=1&s=170667a&w=0&k=20&c=Rzd6WLDTH8IqYRF6F2Ro25Gae2_KuVSSegFPms4xMJk=',
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{card.nameSurname}</Text>
                  <Text style={styles.profession}>{card.profession}</Text>
                </View>
              </View>
            </SwipeCard>
          </TouchableWithoutFeedback>
        ))
      ) : (
        <Text style={styles.card2}>Loading... PLEASE WAIT WHILE WE ARE CHOOSING BEST ARTISTS FOR YOU</Text>
      )}
    </View>
  );
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

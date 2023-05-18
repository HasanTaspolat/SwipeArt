import React, { useState } from "react";
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
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { db } from '../components/config';


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
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  function ResetCards() {
    // Function resets the cards when the algorithm gives new recomandations to customer and changes the set of data.
    cardIndex = 0;

    //setCards()
  }
  async function getUserType() {
    let users = [];
    await getDocs(collection(db, "users", uid , "userPreference")).then(docSnap => {
        let users = [];
        docSnap.forEach((doc)=> {
            users.push({ ...doc.data(), id:doc.id })
        });
        setUser(users);
    })
  }
  async function handlePreCreate() {
      await getUserType();
      let max = 0;
      let maxindex = 0;
      let max2 = 0;
      let max2index = 0; 
      userData.forEach((product, key) => {
        setType(product.id);
        Object.values(product).map((key, value) => {
          console.log(key,value);
          if(key > max) {
            max = key;
            maxindex = value;
            console.log("max is: " + max + " index is: " + maxindex);

          }
          else if(key > max2 && key <= max) {
            max2 = key;
            max2index = value;
            console.log("max 2 is: " + max + " index 2 is: " + max2index);
          }
      });
      Object.keys(product).map((key, value) => {
        console.log(key,value);
        if( maxindex === value ) {
          setHigh(key);
        }
        else if ( max2index === value) {
          setHigh2(key);
        }
      });
    });
    console.log("Highest scores:\n");
    console.log(highestPreference);
    console.log(highestPreference2);
  }

  


  async function FormArtists() {
      await getDocs(query(collection(db, "users"), where('isArtist','==', 1 ))).then(docSnap => {
         let artists = [];
         let artiststemp = [];
          docSnap.forEach((doc)=> {
          artists.push({ ...doc.data(), id:doc.id })
      });
          console.log(artists);
          artists.map((artist, key) => {
            if(String(prefferedType).includes(String(artist.artistType))) {
              artiststemp.push(artist);
            }
          });
          setArtists(artiststemp);         
      });
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
    console.log("Swiped left on card at index", cardIndex);
    setPrefferedArtists();
  };

  const onSwipeRight = (cardIndex) => {
    const newCards = [...cards];
    newCards.splice(cardIndex, 1);
    setCards(newCards);
    console.log("Swiped right on card at index", cardIndex);
    setPrefferedArtists();
  };


  const hideModal = () => {
    setSelectedCard(null);
  };

  return (
    <View style={styles.cardContainer}>
      {cards.map((card, cardIndex) => (
        <TouchableWithoutFeedback
          key={cardIndex}
        >
          <SwipeCard
            data={data}
            gestureDy={gestureDy}
            onSwipeLeft={() => onSwipeLeft(cardIndex)}
            onSwipeRight={() => onSwipeRight(cardIndex)}
          >
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {card.name} {card.surname}
                </Text>
                <Text style={styles.profession}>{card.profession}</Text>
              </View>
            </View>
          </SwipeCard>
        </TouchableWithoutFeedback>
      ))}
      <BottomNavigationCustomer />
      {selectedCard && (
        <Modal
          animationType="slide"
          visible={!!selectedCard}
          onRequestClose={hideModal}
        >
          <View style={styles.modalContainer}>
            <Text>
              {selectedCard.name} {selectedCard.surname}
            </Text>
            <Text>{selectedCard.profession}</Text>
            <Image
              source={{ uri: selectedCard.image }}
              style={styles.modalImage}
            />
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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

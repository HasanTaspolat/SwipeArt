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

export default function SwipeContainer() {
  const [cards, setCards] = useState(data);
  const [gestureDy, setGestureDy] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

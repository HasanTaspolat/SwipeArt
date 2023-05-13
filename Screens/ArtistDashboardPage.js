import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import BottomNavigationArtist from "./BottomNavigationArtist";
import Sidebar from "./Sidebar-2";
import ListingArtistCreator from "./ListingArtistCreator";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "../firebase";

const ArtistDashboardPage = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [activeOrders, setActiveOrders] = useState(0);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const uploadListing = () => {
    navigation.navigate("ListingArtistCreator");
  };

  const seeListings = () => {
    navigation.navigate("AllListings");
  };

  useEffect(() => {
    // Here you can fetch data from your API or database
    // and update the state variables accordingly
    // For demonstration purposes, we will use dummy data:
    const data = {
      orderCount: 10,
      orderType: "Musician",
      activeOrders: 3,
      rating: 4.5,
      name: "John",
      surname: "Doe",
    };

    setOrderCount(data.orderCount);
    setOrderType(data.orderType);
    setActiveOrders(data.activeOrders);
    setRating(data.rating);
    setName(data.name);
    setSurname(data.surname);
  }, []);

  useEffect(() => {
    const q = query(collection(database, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const currentUser = data.find((item) => item.id === auth.currentUser.uid);
  //    <Text style={styles.name}>{currentUser.nameSurname}</Text>
  console.log(currentUser);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.sidebarContainer}>
        <Sidebar />
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{currentUser.nameSurname}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="shopping-cart" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Order Count: {orderCount}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="utensils" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Type: {orderType}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="clock" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Active Orders : {activeOrders}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="star" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Rating: {rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon
              name="upload"
              size={20}
              color="#fff"
              onPress={uploadListing}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Upload Listing</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon
              name="tripadvisor"
              size={20}
              color="#fff"
              onPress={seeListings}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Show Listings</Text>
          </View>
        </View>
      </View>

      <BottomNavigationArtist style={styles.bottomNavigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    marginTop: 22,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
    paddingVertical: 20,
    paddingLeft: 10,
    marginTop: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    width: "45%",
    height: 110,
    borderRadius: 10,
    backgroundColor: "#000212",
    borderColor: "#004d6b",
    borderWidth: 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
  },
});

export default ArtistDashboardPage;

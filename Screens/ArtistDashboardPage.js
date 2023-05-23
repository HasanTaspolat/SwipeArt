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
import { TouchableOpacity } from "react-native-gesture-handler";
import normalize from "react-native-normalize";

const ArtistDashboardPage = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [activeOrders, setActiveOrders] = useState(0);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const uploadListing = () => {
    navigation.navigate("ListingArtistCreator");
  };

  const friendRequestScreen = () => {
    navigation.navigate("FriendRequests");
  };

  const seeListings = () => {
    navigation.navigate("AllListings");
  };

  useEffect(() => {
    const q = query(collection(database, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs.find((item) => item.id === auth.currentUser.uid);
      //console.log("current name", currentUser);
      setData(docs);
      setNameSurname(currentUser.nameSurname);
    });

    const databaseData = {
      rating: 4.5,
    };
    setRating(databaseData.rating);
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
     /*  console.log("artistPreference data", docs_pref);
      console.log("sss:", docs_pref[0].id); */
      setOrderType(docs_pref[0].id);
      setData(docs_pref);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sidebarContainer}>
        <Sidebar />
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{nameSurname}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {/* <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="shopping-cart" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Order Count: {orderCount}</Text>
          </View>
        </View> */}
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon
              name="book-education"
              size={20}
              color="#fff"
              onPress={() => friendRequestScreen()}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Type: {orderType}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon
              name="user-plus"
              size={20}
              color="#fff"
              onPress={() => friendRequestScreen()}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Friend Requests</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {/*   <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="clock" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Active Orders : {activeOrders}</Text>
          </View>
        </View> */}
        {/*  <View style={styles.card}>
          <View style={styles.textContainer}>
            <Icon name="star" size={20} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Rating: {rating}</Text>
          </View>
        </View> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: normalize(35),
  },
  sidebarContainer: {
    position: "absolute",
    top: -70,
    left: -40,
    margin: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  header: {
    marginBottom: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    borderColor: "#004d6b",
    borderWidth: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
  },
});

export default ArtistDashboardPage;


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
              name="utensils"
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
    backgroundColor: "black",
    flex: 1,
  
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 0,
  
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
    paddingLeft: normalize(20),
    marginTop: normalize(80),
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
    paddingLeft: normalize(20),
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
    marginTop: normalize(40),
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

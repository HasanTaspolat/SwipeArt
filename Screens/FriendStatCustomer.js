import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
  writeBatch,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome5";

import { db } from "../components/config";
import { getAuth } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize";

export default function FriendStatCustomer() {
  const [requests, setRequests] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const navigation = useNavigation();

  const handlePress2 = () => {
    navigation.navigate("FriendListCustomer");
  };
  const handlePress = () => {
    navigation.navigate("FilterScreen");
  };

  // Helper function to fetch user's name by their ID
  const getUserName = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().nameSurname; // Assuming the field is named "name"
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (uid) {
      // Ensure uid is not undefined
      const requestQuery = query(
        collection(db, "friendRequests"),
        where("senderId", "==", uid)
      );

      const unsubscribe = onSnapshot(requestQuery, async (snapshot) => {
        const newRequests = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const receiverName = await getUserName(data.receiverId);

            return {
              id: doc.id,
              receiverId: data.receiverId,
              receiverName: receiverName,
              status: data.status,
            };
          })
        );

        setRequests(newRequests);
      });

      return () => unsubscribe();
    }
  }, [uid]); // Re-run the effect when uid changes

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.receiverName || item.receiverId}:{" "}
        {item.status === "accepted"
          ? "Accepted"
          : item.status === "declined"
          ? "Declined"
          : "Pending"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon2} onPress={() => handlePress()}>
        <AntDesign name="left" size={16} color="white" />
      </TouchableOpacity>
      <View style={styles.flexCont}>
        <Text style={styles.friendTitle}>Friend Request Status:</Text>
        <View style={styles.friendContCont}>
          <Text style={styles.title}>All Friends</Text>
          <TouchableOpacity style={styles.buttonFire}>
            <Icon
              name="user"
              size={20}
              style={styles.icon3}
              color="#fff"
              onPress={() => handlePress2()}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(24, 20, 68, 0.8)",
    borderColor: "grey",
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  icon2: {
    marginTop: normalize(40),
    left:20,
    top:10,
  },
  flexCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonFire: {
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "rgba(24, 20, 168, 1)",
    marginTop: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  friendTitle: {
    color: "white",
    fontSize: 20,
    padding: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  friendContCont: {
    marginHorizontal:20,
  },
  icon3: {
    padding: 10,
    textAlign: "center",
  },
});

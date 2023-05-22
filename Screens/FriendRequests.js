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

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };
  const handlePress2 = () => {
    navigation.navigate("FriendsList");
  };

  // Helper function to fetch user's name by their ID
  const getUserName = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    console.log(userSnap.data());
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
        where("receiverId", "==", uid)
      );

      const unsubscribe = onSnapshot(requestQuery, async (snapshot) => {
        const newRequests = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            console.log(data.senderId);
            const senderName = await getUserName(data.senderId);
            setName(senderName);
            return {
              id: doc.id,
              senderId: data.senderId,
              senderName: senderName,
            };
          })
        );

        setRequests(newRequests);
      });

      return () => unsubscribe();
    }
  }, [uid]); // Re-run the effect when uid changes

  const handleAccept = async (requestId, senderId) => {
    const batch = writeBatch(db);

    // Add each user to the other's friend list
    const userRef = doc(db, "users", uid);
    const senderRef = doc(db, "users", senderId);
    batch.update(userRef, { friends: arrayUnion(senderId) });
    batch.update(senderRef, { friends: arrayUnion(uid) });

    // Update the friend request status to "accepted"
    const requestRef = doc(db, "friendRequests", requestId);
    batch.update(requestRef, { status: "accepted" });

    await batch.commit();
  };

  // Function to handle declining a friend request
  const handleDecline = async (requestId) => {
    const requestRef = doc(db, "friendRequests", requestId);
    await updateDoc(requestRef, { status: "declined" });
  };

  console.log(name);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>You have a new friend request from</Text>
      <Text style={styles.name}>{item.senderName || item.senderId}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAccept(item.id, item.senderId)}
        >
          <Text style={styles.buttonText}> Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecline(item.id)}
        >
          <Text style={styles.buttonText}> Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon2} onPress={() => handlePress()}>
        <AntDesign name="left" size={16} color="white" />
      </TouchableOpacity>

      <View style={styles.flexCont}>
        <Text style={styles.friendTitle}>Friend Requests:</Text>
        <View>
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "rgba(24, 20, 168, 1)",
    borderColor: "grey",
    borderWidth: 1,
    width: 100,
    padding: 10,
    marginTop: 15,
    marginHorizontal: 15,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonFire: {
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "rgba(24, 20, 168, 1)",
    marginTop: 5,
  },
  flexCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  item: {
    backgroundColor: "rgba(24, 20, 68, 0.8)",
    borderColor: "grey",
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginTop: 20,
    marginHorizontal: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  name: {
    color: "red",
    fontSize: 16,
  },
  friendTitle: {
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  icon2: {
    padding: 20,
  },
  icon3: {
    padding: 10,
    textAlign: "center",
  },
});

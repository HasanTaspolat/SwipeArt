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
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../components/config";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("FriendRequests");
  };

  const removeFriend = async (friendId) => {
    const batch = writeBatch(db);

    const userRef = doc(db, "users", uid);
    const friendRef = doc(db, "users", friendId);

    // Remove each user from the other's friend list
    batch.update(userRef, { friends: arrayRemove(friendId) });
    batch.update(friendRef, { friends: arrayRemove(uid) });

    await batch.commit();
    console.log("Friend removed.");
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
      const userRef = doc(db, "users", uid);

      const unsubscribe = onSnapshot(userRef, async (userSnap) => {
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.friends) {
            // Assuming the friends list is named "friends"
            const friendsData = await Promise.all(
              userData.friends.map(async (friendId) => {
                const friendName = await getUserName(friendId);

                return {
                  id: friendId,
                  name: friendName,
                };
              })
            );

            setFriends(friendsData);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [uid]); // Re-run the effect when uid changes
  console.log(friends);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name || item.id}</Text>
      <TouchableOpacity>
        <Icon
          name="remove"
          size={26}
          color="white"
          onPress={() => removeFriend(item.id)}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon2} onPress={() => handlePress()}>
        <AntDesign name="left" size={16} color="white" />
      </TouchableOpacity>

      <Text style={styles.friendTitle}>Friend List:</Text>

      <FlatList
        data={friends}
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
  item: {
    item: {
      backgroundColor: "rgba(24, 20, 68, 0.8)",
      borderColor: "grey",
      borderWidth: 1,
      padding: 20,
      marginVertical: 8,
      marginTop: 20,
      marginHorizontal: 16,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },
  },
  title: {
    color: "white",
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
});
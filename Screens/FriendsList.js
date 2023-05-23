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
import normalize from "react-native-normalize";

/* top: normalize(40),
    marginBottom: normalize(10),
    left: 20, */
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
  const startChat = (user1, user2) => {
    // Implement your navigation logic here to open a specific chat
    navigation.navigate("ChatScreen", { userID1: user1, userID2: user2 });
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
      <TouchableOpacity
        style={styles.openChatButton}
        onPress={() => startChat(uid, item.id)}
      >
        <Text style={styles.openChatText}>Open Chat</Text>
      </TouchableOpacity>
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
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            You do not have any friends right now!
          </Text>
        )}
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
  title: {
    color: "white",
    fontSize: 16,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    padding: 20,
  },
  openChatButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  openChatText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  friendTitle: {
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  icon2: {
    top: normalize(60),
    marginBottom: normalize(70),
    left: 20,
  },
});

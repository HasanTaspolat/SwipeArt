import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { onSnapshot, getDoc, doc as docRef, setDoc, updateDoc } from "firebase/firestore";
import { doc } from '@firebase/firestore';
import { db } from "../components/config";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import BottomNavigationArtist from "./BottomNavigationArtist";

function ChatStart() {
  const [notifications, setNotifications] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const [chats, setChats] = useState([
    { id: "1", name: "John", message: "Hey there!", unreadCount: 2 },
    { id: "2", name: "Emily", message: "How are you?", unreadCount: 0 },
    { id: "3", name: "Mike", message: "Long time no see!", unreadCount: 1 },
  ]);

 /* const openChat = (chatId) => {
    // Implement your navigation logic here to open a specific chat
    console.log("Opening chat with ID:", chatId);
  }; */

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "notifications", uid), async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        let notificationList = [];
  
        for (let user in data) {
          // Fetch user data from the 'users' collection
          console.log(user)
          console.log("buraya kadar gelemedi")
          const userDoc = await getDoc(docRef(db, "users", user));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            notificationList.push({
              userId: user, 
              viewed: data[user].viewed,
              nameSurname: userData.nameSurname,
              avatar: userData.photoURL
            });
          }
        }
  
        setNotifications(notificationList);

      }
    });
  
    // Cleanup function to unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, [db, uid]); // Dependencies

  const handleNotificationClick = async (notificationUserId) => {
    try {
      // Update the clicked notification's 'viewed' property to true
      const notificationRef = doc(db, "notifications", notificationUserId);
      await setDoc(notificationRef, {
        [uid]: { viewed: true },
      });
    } catch (error) {
      console.error("Error updating notification: ", error);
    }
  };

  async function markNotificationAsViewed(userId, senderId, db) {
    console.log("Notification marked as viewed successfully");
    try {
      
      // Get the document reference
      const notificationRef = docRef(db, "notifications", userId);
  
      // Update the 'viewed' property of the senderId to true
      await updateDoc(notificationRef, {
        [`${senderId}.viewed`]: true
      });
  
      console.log("Notification marked as viewed successfully");
    } catch (error) {
      console.error("Error marking notification as viewed: ", error);
    }
  }

  const handleNotificationPress = async (notificationUserId) => {
    // Call your existing function
    // Replace 'yourExistingFunction' with the actual function name and arguments
    console.log("Nfasfasfotifiasfasfasaslly");
    await handleNotificationClick(notificationUserId);
  
    // Call the function to mark the notification as viewed
    await markNotificationAsViewed(uid, notificationUserId, db);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications:</Text>
      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.userId}
          onPress={() => handleNotificationPress(notification.userId)}
        >
          <Text style={styles.text}>
            {notification.userId}:
            {notification.viewed ? "Go to chat." : "These users have swiped you right!"}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.chatList}>
          {notifications.map((notification) => (
              <TouchableOpacity
              key={notification.userId}
              onPress={() => handleNotificationPress(notification.userId)}
            >
              <View style={styles.avatarContainer}>
              <Image
                    source={
                      notification.photoURL
                        ? { uri: notification.photoURL }
                        : { uri: "https://i.stack.imgur.com/dr5qp.jpg" }
                    }
                    style={styles.avatar}
                  />
              </View>
              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{notification.nameSurname}</Text>
                <Text style={styles.lastMessage}>
            {notification.viewed ? "Go to chat." : "These users have swiped you right!"}
            </Text>

                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>
                    </Text>
                  </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  chatList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2980B9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  chatDetails: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888888",
  },
  unreadBadge: {
    marginTop: 4,
    backgroundColor: "#E74C3C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default ChatStart;

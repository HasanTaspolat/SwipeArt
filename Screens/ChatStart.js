import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { onSnapshot, getDoc, doc as docRef, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native"
import { doc } from '@firebase/firestore';
import { db } from "../components/config";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigationArtist from "./BottomNavigationArtist";

function ChatStart() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;



  const openChat = (user1, user2) => {
    // Implement your navigation logic here to open a specific chat
    navigation.navigate("ChatScreen",{ userID1: user1 , userID2: user2  });
  }; 

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "notifications", uid), async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        let notificationList = [];
        let unreadCountTemp = 0; // temporary variable to hold unread count
  
        for (let user in data) {
          // Fetch user data from the 'users' collection
          const userDoc = await getDoc(docRef(db, "users", user));
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (!data[user].viewed) {
              unreadCountTemp++; // increment if notification is not viewed
            }
            notificationList.push({
              userId: user, 
              viewed: data[user].viewed,
              nameSurname: userData.nameSurname,
              avatar: userData.photoURL
            });
          }
        }
  
        setNotifications(notificationList);
        setUnreadCount(unreadCountTemp); // update the state
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

    openChat(uid,notificationUserId);
  }
  const handleCrossPress = async (notificationUserId) => {
    try {
      // Update the 'notifications' collection to remove the senderId
      const notificationsRef = doc(db, "notifications", uid);
      await updateDoc(notificationsRef, {
        [notificationUserId]: deleteField()
      });
      console.log("Notification removed successfully");
    } catch (error) {
      console.error("Error removing notification: ", error);
    }
  };
  // function to handle back navigation
  const handleBackNavigation = async () => {
    // Fetch the current user's data
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.isArtist === 1) {
        navigation.navigate("ArtistDashboardPage");
      } else {
        navigation.navigate("MainPage");
      }
    } else {
      console.log("No such user!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackNavigation} style={styles.backButton}>
      <Icon name="arrow-back" size={24} color="#fff" /> 
    </TouchableOpacity>
      <Text style={styles.title}>Notifications & Chat Requests:</Text>
      {unreadCount > 0 && (
      <View style={styles.unreadBubble}>
        <Text style={styles.unreadText}>{unreadCount}</Text>
      </View>
    )}
      <View style={styles.subContainer}>
        <ScrollView contentContainerStyle={styles.chatList}>
          {notifications.map((notification) => (
            <View key={notification.userId}>
              <TouchableOpacity
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
              </View>

              </TouchableOpacity>
              {!notification.viewed && (
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    onPress={() => handleCrossPress(notification.userId)}
                  >
                    <Text style={styles.actionText}>X</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNotificationPress(notification.userId)}
                  >
                    <Text style={styles.actionText}>✔</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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
      marginTop: 45,
    },
    text: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 5,
    },
    subContainer: {
      flex: 1,
      backgroundColor: "#000",
    },
    chatList: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    avatarContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
    },
    backButton: {
      position: "absolute",
      top: 20,
      left: 10,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    chatDetails: {
      flex: 1,
      marginLeft: 12,
    },
    chatName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#ddd",
    },
    lastMessage: {
      fontSize: 14,
      color: "#888",
    },
    unreadBubble: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'purple',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    unreadText: {
      color: '#fff',
      fontSize: 12,
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
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 10,
    },
    actionText: {
      color: "#fff",
      fontSize: 24,
    },
  });
export default ChatStart;

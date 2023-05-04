import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button, Image } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const { uri } = result;
      const message = [
        {
          image: uri,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "User",
          },
        },
      ];
      onSend(message);
    }
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;

    return (
      <View>
        <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          image: doc.data().uri,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBack}>
        <Ionicons
          name="arrow-back"
          size={34}
          color="black"
          onPress={handlePress}
        />
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
        }}
        renderMessageImage={renderMessageImage}
      ></GiftedChat>
      <Button title="Pick an image" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    borderBottomColor: "white",
    borderWidth: 1,
    position: "relative",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  allImage: {
    marginBottom: 10,
  },
  goBack: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 10,
    marginTop: 30,
    zIndex: 221,
  },
  topTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 20,
    marginTop: 40,
    borderBottomColor: "white",
    borderWidth: 1,
  },
  desc: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  image: {
    fontSize: 14,
    color: "white",
    marginBottom: 5,
  },
});

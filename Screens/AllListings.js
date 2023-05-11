import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { auth, database } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { firestore } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const AllListings = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [isArchived, setIsArchived] = useState(false);

  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };

  const deleteListing = async (id) => {
    await deleteDoc(doc(database, "listings", id));
  };

  const archievedOrNot = async (id) => {
    const docIndex = data.findIndex((item) => item.id === id);
    const ref = doc(database, "listings", id);
    const isArchived = data[docIndex].isArchived;
    await updateDoc(ref, { archieved: !isArchived });
    setData([
      ...data.slice(0, docIndex),
      { ...data[docIndex], isArchived: !isArchived },
      ...data.slice(docIndex + 1),
    ]);
    setIsArchived(!isArchived);
  };

  useEffect(() => {
    const q = query(collection(database, "listings"));
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.topTitle}> All Listings Information: </Text>
      {data.map((item) => (
        <View style={styles.container} key={item.id}>
          {item.isArchived ? (
            <Text style={styles.title}> Listing has been archived</Text>
          ) : (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Listing Title: {item.title}</Text>
              <View style={styles.iconsContainer}></View>
              <Text style={styles.desc}>Listing Desc: {item.desc}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.image}>
                Listing Image: {item.image}
              </Text>
              <View style={styles.allImage}>
                <Text style={styles.desc}>Image Preview:</Text>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons
                    name="trash"
                    size={24}
                    color="white"
                    onPress={() => deleteListing(item.id)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() =>
                    navigation.navigate("EditListing", { id: item.id })
                  }
                >
                  <Ionicons
                    name="pencil-outline"
                    size={24}
                    color="white"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={() => archievedOrNot(item.id)}>
            <Text style={styles.textArchive}>
              {item.isArchived ? (
                <Ionicons
                  name="eye-off"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
              ) : (
                <Ionicons
                  name="eye"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
    paddingHorizontal: 20,
    borderBottomColor: "white",
    borderWidth: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: "auto",
    marginVertical: 10,
  },
  button2: {
    marginLeft: 40,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textArchive: {
    color: "white",
    fontSize: 26,
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
    marginTop: 10,
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

export default AllListings;

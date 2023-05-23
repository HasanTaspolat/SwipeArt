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
import { AntDesign } from "@expo/vector-icons";
import { auth, database } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import normalize from "react-native-normalize";
const AllListings = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [isArchived, setIsArchived] = useState(false);

  const handlePress = () => {
    navigation.navigate("ArtistDashboardPage");
  };

  const deleteListing = async (id) => {
    const docRef = doc(database, "users", uid, "listings", id);

    try {
      await deleteDoc(docRef);
      console.log("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const archievedOrNot = async (id) => {
    const docIndex = data.findIndex((item) => item.id === id);
    const ref = doc(database, "users", uid, "listings", id);
    const isArchived = data[docIndex].isArchived;
    await updateDoc(ref, { archieved: !isArchived });
    setData([
      ...data.slice(0, docIndex),
      { ...data[docIndex], isArchived: !isArchived },
      ...data.slice(docIndex + 1),
    ]);
    setIsArchived(!isArchived);
  };
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    const q = query(collection(database, "users", uid, "listings"));
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
      <TouchableOpacity style={styles.icon2} onPress={handlePress}>
        <AntDesign name="left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.topTitle}> All Listings Information: </Text>
      {data.map((item) => (
        <View style={styles.listingContainer} key={item.id}>
          {item.isArchived ? (
            <Text style={styles.archivedText}> Listing has been archived</Text>
          ) : (
            <View>
              <Text style={styles.title}>Listing Title: {item.title}</Text>
              <Text style={styles.desc}>Listing Desc: {item.desc}</Text>
              <Text style={styles.imageLabel}>Listing Image: {item.image}</Text>
              <View style={styles.imageContainer}>
                <Text style={styles.desc}>Image Preview:</Text>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imagePreview}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("EditListing", { id: item.id })}
                >
                  <Ionicons name="pencil-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.archiveButton} onPress={() => archievedOrNot(item.id)}>
            {item.isArchived ? (
              <Ionicons name="eye-off" size={24} color="#fff" />
            ) : (
              <Ionicons name="eye" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#000",
    },
    listingContainer: {
      padding: 20,
      borderBottomColor: "#9370DB",
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    icon2: {
      marginTop: normalize(60),
      left: normalize(10),
      padding: 5,
      width: 40,
      borderRadius: 12,
      marginBottom: 10,
      backgroundColor: "#673AB7",
    },
    title: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    archivedText: {
      color: "#FF6347",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    desc: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 10,
    },
    imageLabel: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 10,
    },
    imageContainer: {
      marginBottom: 20,
    },
    imagePreview: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    editButton: {
      marginLeft: 20,
    },
    archiveButton: {
      backgroundColor: "#9370DB",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    topTitle: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
      borderBottomColor: "#9370DB",
      borderBottomWidth: 2,
    },
  });
  
  export default AllListings;

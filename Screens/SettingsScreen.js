import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MainPage from "./MainPage";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import LoginScreen from "./LoginScreen";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "../firebase";

const SettingsScreen = ({ navigation }) => {
  const auth = getAuth();
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("succss");
        navigation.navigate("StartScreen");
      })
      .catch((error) => {
        console.log("failed");
      });
  };
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const user = auth.currentUser;
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const q = query(collection(database, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      const currentUser = docs.find((item) => item.id === auth.currentUser.uid);
      setCurrentUser(currentUser);
      console.log("current user",currentUser.isArtist);
      setEmail(auth.currentUser.email);

      setData(docs);
    });
  }, []);

  const deletAccount = () => {
    deleteUser(user)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const navigationOnJob = () => {
    console.log(currentUser);
    if(currentUser.isArtist === 1)
    {
      navigation.navigate("ArtistDashboardPage")
    }
    else if(currentUser.isCustomer === 1)
    {
      navigation.navigate("MainPage")
    }
  }

  const handleEmailPress = () => {
    Linking.openURL("mailto:osmanyavuzolgun@gmail.com");
  };

  const handleMatchmaking = (value) => {
    setMatchmaking(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigationOnJob()}
      >
        <AntDesign name="left" size={16} color="white" />
      </TouchableOpacity>

      <View
        style={[
          styles.section,
          { borderBottomWidth: 1, borderBottomColor: "#e3e3e3" },
        ]}
      >
        <Text style={styles.sectionTitle}>Contact Us & Support</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Help & Support</Text>
          <TouchableOpacity style={styles.icon} onPress={handleEmailPress}>
            <AntDesign name="right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { borderBottomWidth: 1, borderBottomColor: "#e3e3e3" },
        ]}
      >
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.row2}>
          <Text style={styles.label3}>E-mail</Text>
          <Text style={styles.label2}>{email}</Text>
        </View>
        <View style={styles.row2}>
          <Text style={styles.label3}>Forgot Password?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPasswordScreen")}
          >
            <Text style={styles.label2}>pas**wor**d</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onSignOut()}>
        <Text style={styles.buttonText}>Logout</Text>
        <AntDesign
          style={styles.logoutIcon}
          name="logout"
          size={16}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => deletAccount()}>
        <Text style={styles.buttonText}>Delete Your Account</Text>
        <AntDesign
          style={styles.logoutIcon}
          name="logout"
          size={16}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    borderRadius: 2,
    padding: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  logoutIcon: {
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  label: {
    fontSize: 14,
    color: "white",
    marginTop: 15,
    marginBottom: 15,
  },
  label3: {
    fontSize: 14,
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    width: 100,
  },
  label2: {
    fontSize: 14,
    color: "hsla(0, 0%, 100% , 0.4)",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 50,
  },
  button: {
    backgroundColor: "#3f62d1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingsScreen;

import React, { useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Background from "../components/Background";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
  AppRegistry,
  Linking,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import ArtistMusicianType from "./ArtistMusicianType";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../components/config";

export default function ArtistMusician({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [vocalist, setVocalist] = useState(false);
  const [producer, setProducer] = useState(false);
  const [engineer, setEngineer] = useState(false);
  const [composer, setComposer] = useState(false);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white', // or any color that contrasts with your background
    },
  };

  function setMusicianJob() {
    setDoc(doc(db, "users", uid, "artistPreference", "MusicianProfession"), {
      vocalist: vocalist === true ? 1 : 0,
      producer: producer === true ? 1 : 0,
      engineer: engineer === true ? 1 : 0,
      composer: composer === true ? 1 : 0,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
        updateDoc(doc(db, "users", uid), {
          completed: 1,
        });
        navigation.navigate("ArtistMusicianType");
      })
      .catch((error) => {
        // The write failed...
        console.log("error burdaaa");
      });
  }

  return (
    <View
    style={styles.container2}
    >
      <Text style={[{ color: "white", marginBottom: 20, fontWeight: "bold" }]}>
        what is your specific profession?
      </Text>

      <View style={styles.radioButton}>
        <RadioButton.Android
          color="red" 
          uncheckedColor="grey"
          value="1"
          status={vocalist === true ? "checked" : "unchecked"}
          onPress={() => setVocalist(!vocalist)}
        />
        <Text style={styles.textButton}>Vocalist</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton.Android
          value="1"
          status={producer === true ? "checked" : "unchecked"}
          onPress={() => setProducer(!producer)}
        />
        <Text style={styles.textButton}>Producer</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton.Android
          value="1"
          status={engineer === true ? "checked" : "unchecked"}
          onPress={() => setEngineer(!engineer)}
        />
        <Text style={styles.textButton}>Sound Engineer</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton.Android
          value="1"
          status={composer === true ? "checked" : "unchecked"}
          onPress={() => setComposer(!composer)}
        />
        <Text style={styles.textButton}>Composer</Text>
      </View>

      <TouchableHighlight onPress={() => setMusicianJob()}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Next</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container2: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  button: {
    width: 200,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3451FF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.46,
    elevation: 9,
  },
  radioButton: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  textButton: {
    color: "white",
  },
});

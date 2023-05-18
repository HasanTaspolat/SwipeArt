import React, { useState } from "react";
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
import MainPage from "./MainPage";
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

export default function CustomerChooseMusician({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [rock, setrock] = useState(false);
  const [rap, setrap] = useState(false);
  const [blues, setblues] = useState(false);
  const [pop, setpop] = useState(false);
  const [edm, setedm] = useState(false);

  // THIS SECTION ONLY SETS INITIAL S
  // REST WILL CHANGE ON ALGORITHM
  function setMusicianPreference() {
    updateDoc(doc(db, "users", uid, "userPreference", "MusicianTypes"), {
      rap: rap === true ? 1 : 0,
      rock: rock === true ? 1 : 0,
      pop: pop === true ? 1 : 0,
      edm: edm === true ? 1 : 0,
      blues: blues === true ? 1 : 0,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
        updateDoc(doc(db, "users", uid), {
          completed: 1,
        });
        navigation.navigate(MainPage);
      })
      .catch((error) => {
        // The write failed...
        console.log("error");
      });
  }

  return (
    <Background>
      <Text style={[{ color: "white", marginBottom: 20, fontWeight: "bold" }]}>
        which specific profession are you looking for?
      </Text>
      <View style={styles.container}>
        <RadioButton
          label="Pop"
          value="1"
          status={pop === true ? "checked" : "unchecked"}
          onPress={() => setpop(!pop)}
        />
        <Text style={styles.textButton}>POP</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          label="Rock"
          value="1"
          status={rock === true ? "checked" : "unchecked"}
          onPress={() => setrock(!rock)}
        />
        <Text style={styles.textButton}>Rock</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          label="Rap"
          value="1"
          status={rap === true ? "checked" : "unchecked"}
          onPress={() => setrap(!rap)}
        />
        <Text style={styles.textButton}>Rap</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          label="blues"
          value="1"
          status={blues === true ? "checked" : "unchecked"}
          onPress={() => setblues(!blues)}
        />
        <Text style={styles.textButton}>Blues</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          label="edm"
          value="1"
          status={edm === true ? "checked" : "unchecked"}
          onPress={() => setedm(!edm)}
        />
        <Text style={styles.textButton}>EDM-Techno</Text>
      </View>

      <TouchableHighlight onPress={() => setMusicianPreference()}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Next</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate(MainPage)}>
        <View>
          <Text style={styles.textButton2}>Others+</Text>
          <Text style={styles.textButton2}>feel free to contact us!</Text>
        </View>
      </TouchableHighlight>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  textButton: {
    color: "white",
  },
  textButton2: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});

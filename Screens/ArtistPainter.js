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
import ArtistMusicianType from "./ArtistMusicianType";
import MainPage from "./MainPage";
import ArtistDashboardPage from "./ArtistDashboardPage";
import { RadioButton } from "react-native-paper";
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

export default function ArtistPainter({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [digitalDesign, setdigitalDesign] = useState(false);
  const [restoration, setrestoration] = useState(false);
  const [graffiti, setgraffiti] = useState(false);
  const [industrial, setindustrial] = useState(false);

  function setPainterJob() {
    updateDoc(doc(db, "users", uid, "artistPreference", "Painter"), {
      digitalDesignScore: digitalDesign === true ? 1 : 0,
      restorationScore: restoration === true ? 1 : 0,
      graffitiScore: graffiti === true ? 1 : 0,
      industrialScore: industrial === true ? 1 : 0,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
        updateDoc(doc(db, "users", uid), {
          completed: 1,
        });
        navigation.navigate("ArtistDashboardPage");
      })
      .catch((error) => {
        // The write failed...
        console.log("error");
      });
  }

  return (
    <Background>
      <Text style={[{ color: "white", marginBottom: 20, fontWeight: "bold" }]}>
        what is your specific profession?
      </Text>
      <View style={styles.radioButton}>
        <RadioButton
          label="Digital Design"
          value="1"
          status={digitalDesign === true ? "checked" : "unchecked"}
          onPress={() => setdigitalDesign(!digitalDesign)}
        />
        <Text style={styles.textButton}>Digital Design</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton
          label="Restoration"
          value="1"
          status={restoration === true ? "checked" : "unchecked"}
          onPress={() => setrestoration(!restoration)}
        />
        <Text style={styles.textButton}>Restoration</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton
          label="Graffiti"
          value="1"
          status={graffiti === true ? "checked" : "unchecked"}
          onPress={() => setgraffiti(!graffiti)}
        />
        <Text style={styles.textButton}>Graffiti</Text>
      </View>

      <View style={styles.radioButton}>
        <RadioButton
          label="Industrial"
          value="1"
          status={industrial === true ? "checked" : "unchecked"}
          onPress={() => setindustrial(!industrial)}
        />
        <Text style={styles.textButton}>Industrial</Text>
      </View>

      <TouchableHighlight onPress={() => setPainterJob()}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Next</Text>
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
  radioButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

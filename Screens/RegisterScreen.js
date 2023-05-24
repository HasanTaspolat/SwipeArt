// eslint-disable-next-line no-use-before-define

// ios 810827365534-9osjht0huj7e8npec71frfm4bk6mnci8.apps.googleusercontent.com
// android 810827365534-8kedvth5h83vlurup31e9j40q73c1k7l.apps.googleusercontent.com
// web 810827365534-lim5le842bacbnr4pa0csp8urfdmjl1k.apps.googleusercontent.com
import React, { useState, useEffect } from "react";
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
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import normalize from "react-native-normalize";
import LoginScreen from "./LoginScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { LogBox } from "react-native";
import * as ImagePicker from "expo-image-picker";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
import ChooseScreenFirst from "./ChooseScreenFirst";
import "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import { firebaseConfig } from "../components/config"; // Modify the path to your Firebase config
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../components/config";

WebBrowser.maybeCompleteAuthSession();
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [checkBoxMessage, setcheckBoxMessage] = useState();
  const [userMessage, setUserMessage] = useState();
  const [nameSurname, setNameSurname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    twitter: "",
    instagram: "",
    linkedin: "",
    behance: "",
  });
  const storage = getStorage(firebaseConfig);
  const [photoURL, setPhotoURL] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  LogBox.ignoreAllLogs(); // to hide the warnings

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia((prevState) => ({
      ...prevState,
      [platform]: value,
    }));
  };

  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(
      storage,
      "profileImages/" + Math.random().toString(36).substring(2, 15)
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const url = await uploadImageToFirebase(result.assets[0].uri);
      setPhotoURL(url);

      console.log(url);
      await updateDoc(doc(db, "users", uid), {
        photoURL: url,
      });

   
    }

  };

  function create(userUID) {
    setDoc(doc(db, "users", userUID), {
      email: email,
      nameSurname: nameSurname,
      username: username,
      bio: bio,
      socialMedia: socialMedia,
      isArtist: 0,
      isCustomer: 0,
      photoURL: photoURL,
      useruid: userUID,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  }

  const checkIfUsernameExists = async (username) => {
    const docRef = doc(db, "usernames", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Username already exists!");
      return true;
    } else {
      console.log("Username does not exist!");
      return false;
    }
  };

  const createUsernameDocument = async (username, userUID) => {
    await setDoc(doc(db, "usernames", username), {
      userUID: userUID,
    });
  };

  const handleSignUp = async () => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,12}$/;

    const isUsernameTaken = await checkIfUsernameExists(username); // wait for the promise to resolve

    if (isUsernameTaken) {
      console.log("Username already taken, choose another one!");
      setUserMessage(
        <Text style={styles.errorMessage2}>
          Username already taken, choose another one!
        </Text>
      );
      return; // Return here to stop execution
    }
    if (passwordRegex.test(password) === false) {
      console.log(
        "Please enter a password that contains one uppercase letter, one numeric character, one non-alphanumeric character, and is between 8 and 12 characters long."
      );
      setUserMessage(
        <Text style={styles.errorMessage2}>
          Please enter a password that contains one uppercase letter, one
          numeric character, one non-alphanumeric character, and is between 8
          and 12 characters long.
        </Text>
      );
      navigation.navigate(RegisterScreen);
    } else if (email === "") {
      setUserMessage(
        <Text style={styles.errorMessage2}> Please fill the E-mail box!</Text>
      );
    } else if (password === "") {
      setUserMessage(
        <Text style={styles.errorMessage2}> Please fill the Password box!</Text>
      );
    } else if (password === "" && email === "") {
      setUserMessage(
        <Text style={styles.errorMessage2}>
          Please fill E-mail and Password boxes!
        </Text>
      );
    } else if (emailReg.test(email) === false) {
      setUserMessage(
        <Text style={styles.errorMessage2}>
          Please fill valid Email address!
        </Text>
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          var user = userCredential.user;
          create(user.uid);
          await createUsernameDocument(username, user.uid);
          navigation.navigate("LoginScreen");
          setUserMessage(<Text> </Text>);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          navigation.navigate(RegisterScreen);
          setUserMessage(
            <Text style={styles.errorMessage2}> E-mail is already in use!</Text>
          );
        });
    }
  };
  const handlePress = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <ScrollView style={styles.main2}>
      <TouchableOpacity onPress={() => handlePress()}>
        <AntDesign name="left" style={styles.icon2} size={16} color="white" />
      </TouchableOpacity>
      <View style={styles.main}>
        <Text style={styles.header1}>Sign Up</Text>
        <Text style={styles.header4}>
          Fields marked with (*) are required to be filled.
        </Text>

        <Text style={styles.header2}>E-mail*</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#ffff"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.header2, styles.passHead]}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor="#ffff"
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text style={[styles.header2, styles.passHead]}>Name & Surname*</Text>
        <TextInput
          style={styles.input}
          placeholder="Name and Surname"
          value={nameSurname}
          placeholderTextColor="#ffff"
          onChangeText={setNameSurname}
        />

        <Text style={[styles.header2, styles.passHead]}>Username*</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          placeholderTextColor="#ffff"
          onChangeText={setUsername}
        />

        <Text style={[styles.header2, styles.passHead]}>Social Media </Text>
        <Text style={[styles.header5, styles]}>
          (please fill the blanks with full link)
        </Text>

        <View style={styles.socialMediaCont}>
          <Icon
            style={styles.socialMediaIcon}
            name="twitter"
            size={25}
            color="#1DA1F2"
          />
          <TextInput
            style={styles.input}
            placeholder="Twitter"
            placeholderTextColor="#ffff"
            value={socialMedia.twitter}
            onChangeText={(value) => handleSocialMediaChange("twitter", value)}
          />
        </View>
        <View style={styles.socialMediaCont}>
          <Icon
            style={styles.socialMediaIcon}
            name="instagram"
            size={25}
            color="#C13584"
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram"
            value={socialMedia.instagram}
            placeholderTextColor="#ffff"
            onChangeText={(value) =>
              handleSocialMediaChange("instagram", value)
            }
          />
        </View>
        <View style={styles.socialMediaCont}>
          <Icon
            style={styles.socialMediaIcon}
            name="linkedin"
            size={25}
            color="#0077B5"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#ffff"
            placeholder="LinkedIn"
            value={socialMedia.linkedin}
            onChangeText={(value) => handleSocialMediaChange("linkedin", value)}
          />
        </View>
        <View style={styles.socialMediaCont}>
          <Icon
            style={styles.socialMediaIcon}
            name="behance"
            size={25}
            color="#1769FF"
          />
          <TextInput
            style={styles.input}
            placeholder="Behance"
            placeholderTextColor="#ffff"
            value={socialMedia.behance}
            onChangeText={(value) => handleSocialMediaChange("behance", value)}
          />
        </View>

        <Text style={[styles.header2, styles.passHead]}>Biography*</Text>
        <TextInput
          style={styles.input}
          placeholder="Biography"
          value={bio}
          placeholderTextColor="#ffff"
          onChangeText={setBio}
        />

        <TouchableHighlight
          style={styles.buttonPhoto}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            handleChoosePhoto();
          }}
        >
          <Text style={styles.button3title}>Choose Profile Image*</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.button1title}>Create My Account</Text>
        </TouchableHighlight>

        <Text style={styles.errorMessage2}>{userMessage}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#000000",
    width: normalize(380, "width"),
    alignItems: "center",
    height: "100%",
  },
  icon2: {
    padding: 20,
  },
  main2: {
    backgroundColor: "#000000",
  },
  socialMediaCont: {
    width: "100%",
    marginTop: normalize(14),
    color: "#fff",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  socialMediaIcon: {
    marginRight: "auto",
    marginLeft: normalize(44),
  },

  input: {
    width: "80%",
    height: normalize(50),
    borderWidth: 1.1,
    borderRadius: normalize(10),
    marginTop: normalize(14),
    paddingHorizontal: normalize(10),
    borderColor: "#C3CAD8",
    color: "#fff",
  },
  googleIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  errorMessage2: {
    fontSize: normalize(13),
    color: "red",
    fontWeight: "600",
    width: normalize(220),
    marginTop: normalize(80),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff0033",
  },
  button: {
    borderRadius: normalize(6),
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#ffff",
    width: "70%",
    height: normalize(50),
    marginTop: normalize(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonPhoto: {
    borderRadius: normalize(6),
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "black",
    width: "70%",
    height: normalize(50),
    marginTop: normalize(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button1title: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: normalize(18),
    paddingTop: normalize(13),
  },
  button3title: {
    textAlign: "center",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: normalize(14),
  },
  button2: {
    paddingTop: normalize(25),
  },
  button2title: {
    color: "#2C3345",
    height: normalize(20),
  },
  header1: {
    marginBottom: normalize(25),
    fontSize: normalize(22),
    marginLeft: normalize(0),
    fontWeight: "bold",
    color: "white",
  },
  checkBoxTitle: {
    marginBottom: normalize(25),
    fontSize: normalize(12),
    alignItems: "center",
    fontWeight: "bold",
    color: "#ff0033",
  },
  header2: {
    marginTop: normalize(18),
    fontSize: normalize(17),
    marginLeft: normalize(40),
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: "auto",
  },
  header5: {
    marginTop: normalize(4),
    fontSize: normalize(14),
    marginLeft: normalize(40),
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: "auto",
  },
  header4: {
    marginTop: normalize(18),
    fontSize: normalize(14),
    marginLeft: normalize(40),
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: "auto",
  },
  bottomImage: {
    fontSize: normalize(20),
    color: "white",
    position: "absolute",
    marginTop: normalize(40),
  },
  termsText: {
    marginTop: normalize(10),
    paddingLeft: normalize(20),
    marginLeft: normalize(40),
    width: normalize(300, "width"),
    height: normalize(50, "height"),
    color: "black",
  },
  checkBoxStyle: {
    alignSelf: "center",
    borderColor: "#C3CAD8",
    borderWidth: 1.1,
    borderRadius: normalize(5),
    marginRight: normalize(270),
    transform: [{ translateY: normalize(33) }],
  },
});

export default RegisterScreen;

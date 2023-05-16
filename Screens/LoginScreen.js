// eslint-disable-next-line no-use-before-define

// ios 810827365534-9osjht0huj7e8npec71frfm4bk6mnci8.apps.googleusercontent.com
// android 810827365534-8kedvth5h83vlurup31e9j40q73c1k7l.apps.googleusercontent.com
// web 810827365534-lim5le842bacbnr4pa0csp8urfdmjl1k.apps.googleusercontent.com
import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserSessionPersistence,
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
import normalize from "react-native-normalize";
import { firebase } from "../firebase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  LogBox,
  Switch,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
// import TabsCustomer from './TabsCustomer';
import "@react-navigation/native-stack";
import ChooseScreenFirst from "./ChooseScreenFirst";
import ArtistOrCustomer from "./ArtistOrCustomer";
import ResetPasswordScreen from "./ResetPasswordScreen";
import RegisterScreen from "./RegisterScreen";
import ResetPassword from "./ResetPasswordScreen";
import ArtistDashboardPage from "./ArtistDashboardPage.js";

// onPress={() => {  navigation.navigate(LoginScreen)  }}
LogBox.ignoreAllLogs(); // to hide the warnings

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();
  isLoading: false;
  const [userMessage, setUserMessage] = useState();
  let UserType;
  const [rememberMe, setRememberMe] = useState(false);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "810827365534-8kedvth5h83vlurup31e9j40q73c1k7l.apps.googleusercontent.com",
    iosClientId:
      "810827365534-9osjht0huj7e8npec71frfm4bk6mnci8.apps.googleusercontent.com",
    expoClientId:
      "810827365534-lim5le842bacbnr4pa0csp8urfdmjl1k.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          create(user.uid, user);
          handleNavigation(user.email);
          setUserMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response, token]);

  useEffect(() => {
    AsyncStorage.getItem("email").then((value) => {
      if (value !== null) {
        setEmail(value);
        setRememberMe(true);
      }
    });
    AsyncStorage.getItem("password").then((value) => {
      if (value !== null) {
        setPassword(value);
      }
    });
  }, []);

  async function create(userUID, user) {
    const isFunctionCalled = await AsyncStorage.getItem("isFunctionCalled");
    if (isFunctionCalled === null) {
      await setDoc(doc(db, "users", userUID), {
        email: user.email,
        isArtist: 0,
        isCustomer: 0,
      });
      await AsyncStorage.setItem("isFunctionCalled", "true");
      console.log("data submitted");
    } else {
      console.log("function already called");
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  async function getUserType(mail) {
    let users = [];
    await getDocs(
      query(collection(db, "users"), where("email", "==", mail))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
    });
    UserType = users[0].isArtist;
    console.log("Artist : " + users[0].isArtist);
    console.log("User Type : " + UserType);
  }
  async function handleNavigation(mail) {
    await getUserType(mail);
    console.log("User Type Before Check : " + UserType);
    if (UserType === 1) {
      navigation.navigate(ArtistDashboardPage);
    } else {
      navigation.navigate(ArtistOrCustomer);
    }
  }

  const handleSignInCustomer = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        onAuthStateChanged(auth, (user) => {
          if (user) {
            handleNavigation(user.email);
            setUserMessage("");
            if (rememberMe) {
              AsyncStorage.setItem("email", email);
              AsyncStorage.setItem("password", password);
            } else {
              AsyncStorage.removeItem("email");
              AsyncStorage.removeItem("password");
            }
          } else {
            navigation.navigate(LoginScreen);
            setUserMessage("Wrong Password or Email! ");
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setUserMessage(
          <Text style={styles.errorMessage2}>Wrong Password or E-mail!</Text>
        );
      });
  };
  return (
    <View style={styles.main}>
      <Text style={styles.header2}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={"white"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={[styles.header2, styles.passHead]}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        placeholderTextColor={"white"}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Text style={styles.userMessageTitle}>{userMessage}</Text>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="blue"
        style={styles.button}
        onPress={handleSignInCustomer}
      >
        <Text style={styles.button1title}>Sign In</Text>
      </TouchableHighlight>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={styles.button1title}>Sign In With Google</Text>
        <Image
          style={{ marginTop: 15, marginLeft: 6, width: 20, height: 20 }}
          source={{
            uri: "https://i.ibb.co/j82DCcR/search.png",
          }}
        />
      </TouchableOpacity>
      <View style={styles.rememberMeContainer}>
        <Text style={styles.button2title}>Remember me</Text>
        <Switch
          style={styles.switch}
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={rememberMe ? "#2E69FF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <TouchableHighlight
        activeOpacity={0.8}
        style={styles.button2}
        onPress={() => navigation.navigate(RegisterScreen)}
      >
        <Text style={styles.button2title}>
          Don't Have an Account?
          <Text style={styles.signUpTitle}> Sign Up </Text>
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.8}
        style={styles.button2}
        onPress={() => navigation.navigate(ResetPassword)}
      >
        <Text style={styles.button2title}>
          Forgot your password?
          <Text style={styles.signUpTitle}> Reset Password </Text>
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  input: {
    width: "80%",
    height: normalize(50),
    borderWidth: 1.1,
    borderRadius: normalize(10),
    marginTop: normalize(20),
    paddingHorizontal: normalize(10),
    borderColor: "white",
    color: "white",
  },
  rememberMeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: normalize(10),
    borderColor: "blue",
    borderWidth: 1,
    backgroundColor: "white",
    width: "70%",
    height: normalize(50),
    marginBottom: normalize(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button1title: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: normalize(18),
    paddingTop: normalize(13),
    borderRadius: normalize(10),
  },
  button2: {
    marginTop: normalize(10),
    paddingBottom: normalize(30),
  },
  button2title: {
    color: "white",
    height: normalize(20),
  },
  header1: {
    marginTop: normalize(25),
    fontSize: normalize(22),
    marginLeft: normalize(0),
    fontWeight: "bold",
    color: "#2C3345",
  },
  header2: {
    marginTop: normalize(25),
    fontSize: normalize(17),
    marginLeft: normalize(40),
    color: "white",
    fontWeight: "600",
    marginRight: "auto",
  },
  errorMessage2: {
    fontSize: normalize(16),
    color: "red",
    fontWeight: "600",
    marginRight: "auto",
  },
  signUpTitle: {
    color: "#2E69FF",
  },
  bottomImage: {
    fontSize: normalize(16),
    color: "#92969e",

    marginBottom: normalize(15),
  },
  userMessageTitle: {
    paddingTop: normalize(30),
    fontSize: normalize(13),
    alignItems: "center",
    fontWeight: "bold",
    color: "#ff0033",
  },
});

export default LoginScreen;

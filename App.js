import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./Screens/SignInScreen";
import LoginScreen from "./Screens/LoginScreen";
import StartScreen from "./Screens/StartScreen";
import ArtistMusician from "./Screens/ArtistMusician";
import ArtistMusicianType from "./Screens/ArtistMusicianType";
import ArtistPainter from "./Screens/ArtistPainter";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ProfileScreenCustomer from "./Screens/ProfileScreenCustomer";
import MainPage from "./Screens/MainPage";
import ArtistDashboardPage from "./Screens/ArtistDashboardPage";
import RegisterScreen from "./Screens/RegisterScreen";
import ChooseScreenFirst from "./Screens/ChooseScreenFirst";
import CustomerChooseMusician from "./Screens/CustomerChooseMusician";
import CustomerChoosePainter from "./Screens/CustomerChoosePainter";
import ArtistOrCustomer from "./Screens/ArtistOrCustomer";
import CustomerChooseScreenFirst from "./Screens/CustomerChooseScreenFirst";
import SettingsScreen from "./Screens/SettingsScreen";
import ChatScreen from "./Screens/ChatScreen";
import ListingArtistCreator from "./Screens/ListingArtistCreator";
import AllListings from "./Screens/AllListings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import normalize from "react-native-normalize";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="StartScreen"
            component={StartScreen}
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(55, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="RegisterScreen"
            component={RegisterScreen}
            style="display:none;"
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ChooseScreenFirst"
            component={ChooseScreenFirst}
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="CustomerChooseScreenFirst"
            component={CustomerChooseScreenFirst}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="SettingsScreen"
            component={SettingsScreen}
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="CustomerChooseMusician"
            component={CustomerChooseMusician}
          />
          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="CustomerChoosePainter"
            component={CustomerChoosePainter}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ArtistOrCustomer"
            component={ArtistOrCustomer}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ArtistMusician"
            component={ArtistMusician}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ArtistMusicianType"
            component={ArtistMusicianType}
          />

          <Tab.Screen
            options={{
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "#000",
              tabBarInactiveTintColor: "#000",
              tabBarLabelStyle: {},
              tabBarButton: (props) => null,
            }}
            name="ArtistPainter"
            component={ArtistPainter}
          />

          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30} />
              ),
              tabBarActiveBackgroundColor: "white",
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "black",
              tabBarLabelStyle: {},
              tabBarLabel: "Swipe",

              tabBarActiveTintColor: "blue",
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
            }}
            name="MainPage"
            component={MainPage}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30} />
              ),
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,

              tabBarLabel: "ArtistDashboardPage",

              tabBarActiveTintColor: "blue",
            }}
            name="ArtistDashboardPage"
            component={ArtistDashboardPage}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30} />
              ),
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,

              tabBarLabel: "ArtistDashboardPage",

              tabBarActiveTintColor: "blue",
            }}
            name="ChatScreen"
            component={ChatScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30} />
              ),
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,

              tabBarLabel: "ArtistDashboardPage",

              tabBarActiveTintColor: "blue",
            }}
            name="ListingArtistCreator"
            component={ListingArtistCreator}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30} />
              ),
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarLabel: "ArtistDashboardPage",
              tabBarActiveTintColor: "blue",
            }}
            name="AllListings"
            component={AllListings}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              headerTintColor: "white",
              headerTitleAlign: "center",
              title: "Profile",
              tabBarIcon: ({ color, size, tintColor }) => (
                <Ionicons name="person" color={color} size={30} />
              ),
              tabBarActiveBackgroundColor: "white",
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "black",
              tabBarLabelStyle: {},
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "blue",
              tabBarLabel: "Profile",
            }}
            name="ProfileScreen"
            component={ProfileScreen}
          />

          <Tab.Screen
            options={{
              headerShown: false,
              headerTintColor: "white",
              headerTitleAlign: "center",
              title: "Profile",
              tabBarIcon: ({ color, size, tintColor }) => (
                <Ionicons name="person" color={color} size={30} />
              ),
              tabBarActiveBackgroundColor: "white",
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "black",
              tabBarLabelStyle: {},
              tabBarStyle: {
                backgroundColor: "#000",
                height: normalize(0, "height"),
                borderTopColor: "#000",
              },
              headerShown: false,
              tabBarActiveTintColor: "blue",
              tabBarLabel: "Profile",
            }}
            name="ProfileScreenCustomer"
            component={ProfileScreenCustomer}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  button2: {
    marginLeft: 10,
  },
});

// import { Text, View } from 'react-native';
// import SignInScreen from './Screens/SignInScreen';
// import LoginScreen from './Screens/LoginScreen';
// import StartScreen from './Screens/StartScreen';
// import ResetPasswordScreen from './Screens/ResetPasswordScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import 'react-navigation'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// export default function App() {
//   const Stack = createNativeStackNavigator();

//   return (
//     <NavigationContainer >
//       <Stack.Navigator>

//         {/* <Stack.Screen
//           name="Splashscreen"
//           component={Splashscreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         /> */}
//         <Stack.Screen
//           name="SignInScreen"
//           component={SignInScreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />
//         <Stack.Screen
//           name="StartScreen"
//           component={StartScreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />
//         <Stack.Screen
//           name="ResetPassword"
//           component={ResetPasswordScreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />
//         <Stack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />
//         <Stack.Screen
//           name="RegisterScreen"
//           component={RegisterScreen}
//           options={{ headerShown: false, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />

//         {/* <Stack.Screen
//           name="TabsCustomer"
//           component={TabsCustomer}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignUpScreenCustomer"
//           component={SignUpScreenCustomer}
//           options={{ headerShown: true, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         />
//         <Stack.Screen
//           name="Reservation"
//           component={Reservation}
//           options={{ headerShown: true, title: null, headerStyle: { backgroundColor: '#0a1551' } }}
//         /> */}

//       </Stack.Navigator>

//     </NavigationContainer>

//   );
// }

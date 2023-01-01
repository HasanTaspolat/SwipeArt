import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './Screens/SignInScreen';
import LoginScreen from './Screens/LoginScreen';
import StartScreen from './Screens/StartScreen';
import ArtistMusician from './Screens/ArtistMusician';
import ArtistMusicianType from './Screens/ArtistMusicianType';
import ArtistPainter from './Screens/ArtistPainter';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MainPage from './Screens/MainPage';
import RegisterScreen from './Screens/RegisterScreen';
import ChooseScreenFirst from './Screens/ChooseScreenFirst';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import normalize from 'react-native-normalize';
import { Ionicons } from '@expo/vector-icons';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider >
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
                backgroundColor: '#000',
                height: normalize(0, 'height'),
                borderTopColor: '#000',
              },
              headerShown: false,
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: '#000',
              tabBarLabelStyle: {
              },
              tabBarButton: (props) => null,
            }}
            name="StartScreen" component={StartScreen} />
          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }} name="LoginScreen" component={LoginScreen} />
          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(55, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }} name="RegisterScreen" component={RegisterScreen} style="display:none;" />
          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }}
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />

          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }}
            name="ChooseScreenFirst"
            component={ChooseScreenFirst}
          />

          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }}
            name="ArtistMusician"
            component={ArtistMusician}
          />

          <Tab.Screen options={{

            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }}
            name="ArtistMusicianType"
            component={ArtistMusicianType}
          />

          <Tab.Screen options={{
            tabBarStyle: {
              backgroundColor: '#000',
              height: normalize(0, 'height'),
              borderTopColor: '#000',
            },
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
            },
            tabBarButton: (props) => null,
          }}
            name="ArtistPainter"
            component={ArtistPainter}
          />

          <Tab.Screen
            options={{
              headerShown: true, headerTintColor: 'white', headerTitleAlign: 'center', title: "swipeArt.", headerStyle: { backgroundColor: 'black' }, headerRight: () => <Image style={styles.button}
                source={require("./assets/settings-icon.png")}  />, headerLeft: () => <Image style={styles.button2} source={require("./assets/three-bars-icon.png")} />,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" color={color} size={30}   />
              ),
              tabBarActiveBackgroundColor: 'white',
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'black',
              tabBarLabelStyle: {
              },
              tabBarLabel: 'Swipe',
              tabBarStyle: {
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
                position: 'absolute',
                overflow: 'hidden',
              },
              tabBarActiveTintColor: "blue",
              
            }}
            name="MainPage"
            component={MainPage}
          />
          <Tab.Screen options={{
            headerShown: true, headerTintColor: 'white', headerTitleAlign: 'center', title: "Profile", headerStyle: { backgroundColor: 'black' }, headerRight: () => <Image style={styles.button}
              source={require("./assets/settings-icon.png")} />, headerLeft: () => <Image style={styles.button2} source={require("./assets/three-bars-icon.png")} />,
            tabBarIcon: ({ color, size, tintColor }) => (
              <Ionicons name="person"  color={color} size={30} />
            ),
            tabBarActiveBackgroundColor: 'white',
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            tabBarLabelStyle: {
            },
            tabBarActiveTintColor: "blue",
            tabBarLabel: 'Profile',
            tabBarStyle: {
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              position: 'absolute',
              overflow: 'hidden',
            },

          }}
            name="ProfileScreen"
            component={ProfileScreen}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({

  button: {
    marginRight: 10,
  },
  button2: {
    marginLeft: 10,
  },
})















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
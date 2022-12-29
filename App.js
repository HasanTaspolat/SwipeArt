import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './Screens/SignInScreen';
import LoginScreen from './Screens/LoginScreen';
import StartScreen from './Screens/StartScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ChooseScreenFirst from './Screens/ChooseScreenFirst';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import normalize from 'react-native-normalize';

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
          }}
            name="ChooseScreenFirst"
            component={ChooseScreenFirst}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}















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
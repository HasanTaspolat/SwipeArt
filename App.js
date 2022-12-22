import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './Screens/SignInScreen';
import LoginScreen from './Screens/LoginScreen';
import StartScreen from './Screens/StartScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import RegisterScreen from './Screens/RegisterScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
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
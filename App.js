import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen'
import { store } from './store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import SelectCountry from './screens/SelectCountry';
import VerifyCode from './screens/VerifyCode';
import SignUpScreen from './screens/SignUpScreen';
// ! SET UP REDUX


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider >
          <KeyboardAvoidingView 
          
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         style={{flex: 1}}
          >

          <Stack.Navigator>
          <Stack.Screen name='AuthScreen' component={AuthScreen} options={{
              headerShown: false,
            }} />

          <Stack.Screen name='SignupScreen' component={SignUpScreen} options={{
              headerShown: false,
            }} />

          <Stack.Screen name='VerifyScreen' component={VerifyCode} options={{
              headerShown: false,
            }} />

            <Stack.Screen name='CountrySelect' component={SelectCountry} options={{
              headerShown: true,
              title: "Select a Country"
            }} />

            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
              headerShown: false,
            }} />

            <Stack.Screen name='MapScreen' component={MapScreen} options={{
              headerShown: false,
            }} />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

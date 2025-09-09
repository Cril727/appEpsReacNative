import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './auth/AuthContext';
import Register from './screens/Auth/register';
import Inicio from './screens/Inicio/inicio';
import Login from './screens/Auth/login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Inicio" component={Inicio} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

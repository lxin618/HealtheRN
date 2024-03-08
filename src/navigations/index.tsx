import { useEffect, useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../screens/Home';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import Disclaimer from '../screens/Disclaimer';
import Splash from '../screens/Splash'

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash">
          <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
          <Stack.Screen name="Disclaimer" options={{ headerShown: false }} component={Disclaimer} />
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

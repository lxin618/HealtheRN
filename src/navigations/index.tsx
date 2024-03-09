import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome, Signup, Disclaimer, Splash} from '../screens';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust the time as needed
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Splash />
      ) : (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Disclaimer"
            options={{headerShown: false}}
            component={Disclaimer}
          />
          <Stack.Screen
            name="Welcome"
            options={{headerShown: false}}
            component={Welcome}
          />
          <Stack.Screen
            name="Signup"
            options={{headerShown: false}}
            component={Signup}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

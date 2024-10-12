import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Welcome,
    CreateAccount,
    Disclaimer,
    Verify,
    Verified,
    Home,
    Signin,
    Register,
    AccountSetup,
    HealthBackground,
    HealthBackgroundStep2,
} from '../screens';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
                name="Disclaimer"
                options={{ headerShown: false }}
                component={Disclaimer}
            />
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
            <Stack.Screen
                name="CreateAccount"
                options={{ headerShown: false }}
                component={CreateAccount}
            />
            <Stack.Screen name="Verify" options={{ headerShown: false }} component={Verify} />
            <Stack.Screen name="Verified" options={{ headerShown: false }} component={Verified} />
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="Signin" options={{ headerShown: false }} component={Signin} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
            <Stack.Screen
                name="AccountSetup"
                options={{ headerShown: false }}
                component={AccountSetup}
            />
            <Stack.Screen
                name="HealthBackground"
                options={{ headerShown: false }}
                component={HealthBackground}
            />
            <Stack.Screen
                name="HealthBackgroundStep2"
                options={{ headerShown: false }}
                component={HealthBackgroundStep2}
            />
        </Stack.Navigator>
    );
};

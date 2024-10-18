import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    AccountSetup, 
    HealthBackground,
    HealthBackgroundStep2, 
    DiagnoseDisclaimer,
    TravelHistory
} from '../screens';
import { BottomNav } from './bottomNav';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomNav} />
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
            <Stack.Screen
                name="DiagnoseDisclaimer"
                options={{ headerShown: false }}
                component={DiagnoseDisclaimer}
            />
            <Stack.Screen
                name="TravelHistory"
                options={{ headerShown: false }}
                component={TravelHistory}
            />
        </Stack.Navigator>
    );
};

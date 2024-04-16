import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Welcome,
    CreateAccount,
    Disclaimer,
    Splash,
    Verify,
    Verified,
    Home,
    Signin,
    Register,
    AccountSetup,
    AccountSetupFinal,
} from '../screens';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            setIsLoading(false);
        }, 3500); // Adjust the time as needed
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? (
                <Splash />
            ) : (
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen
                        name="Disclaimer"
                        options={{ headerShown: false }}
                        component={Disclaimer}
                    />
                    <Stack.Screen
                        name="Welcome"
                        options={{ headerShown: false }}
                        component={Welcome}
                    />
                    <Stack.Screen
                        name="CreateAccount"
                        options={{ headerShown: false }}
                        component={CreateAccount}
                    />
                    <Stack.Screen
                        name="Verify"
                        options={{ headerShown: false }}
                        component={Verify}
                    />
                    <Stack.Screen
                        name="Verified"
                        options={{ headerShown: false }}
                        component={Verified}
                    />
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
                    <Stack.Screen
                        name="Signin"
                        options={{ headerShown: false }}
                        component={Signin}
                    />
                    <Stack.Screen
                        name="Register"
                        options={{ headerShown: false }}
                        component={Register}
                    />
                    <Stack.Screen
                        name="AccountSetup"
                        options={{ headerShown: false }}
                        component={AccountSetup}
                    />
                    <Stack.Screen
                        name="AccountSetupFinal"
                        options={{ headerShown: false }}
                        component={AccountSetupFinal}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

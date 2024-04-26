import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, AccountSetup, HealthBackground, HealthBackgroundStep2 } from '../screens';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
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

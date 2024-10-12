import React from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Splash } from '../screens';
import { AuthContext } from '../context/authContext';
import { AppStack } from './appStack';
import { AuthStack } from './authStack';

export const AppNavigation = () => {
    const { loading, accessToken } = useContext(AuthContext);

    // useEffect(() => {
    //     // Simulate loading process
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3500); // Adjust the time as needed
    // }, []);

    if (loading) {
        return <Splash />;
    }

    return <NavigationContainer>{accessToken ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

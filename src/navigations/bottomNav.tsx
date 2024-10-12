import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Settings, Profile } from '../screens';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={'home'}
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/house.png')}
                            style={[styles.navIcon, { tintColor: focused ? '#0076FF' : '#8B8DA5' }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/user_circle.png')}
                            style={[styles.navIcon, { tintColor: focused ? '#0076FF' : '#8B8DA5' }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={'Settings'}
                component={Settings}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/gear.png')}
                            style={[styles.navIcon, { tintColor: focused ? '#0076FF' : '#8B8DA5' }]}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    navIcon: {
        width: 30,
        height: 30,
    },
});

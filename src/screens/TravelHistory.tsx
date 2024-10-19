import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { CheckupHeading } from '../components/CheckupHEader';
import { NaviProps } from '../helper/naviType';
import { Bar } from 'react-native-progress';
import Header from '../components/Header';

export const TravelHistory = ({ navigation }: NaviProps) => {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
                <Animated.View
                    entering={FadeInLeft.delay(50).duration(500).springify()}
                    className="leading-6"
                >
                    {CheckupHeading('Recent Travel History', navigation)}
                    <Bar
                        className="mt-8"
                        borderWidth={0}
                        progress={0.05}
                        width={null}
                        unfilledColor="#E6E6EE"
                        borderRadius={0}
                        height={4}
                    />
                    <Header
                        heading={'Where have you been in the last 3 months?'}
                        noIcon
                        headerStyle={styles.header}
                    />
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        width: 400,
    },
});

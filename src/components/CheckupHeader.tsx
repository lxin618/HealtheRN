import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BaseText from '../components/BaseText';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export const CheckupHeading = (heading: string, navigation: NavigationProp<ParamListBase>) => {
    return (
        <View className="flex flex-row pt-2">
            <BaseText className="text-lg mt-2 text-[#515185]">{heading}</BaseText>
            <View className="flex flex-row-reverse flex-1 top-1">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.cancel}
                        source={require('../../assets/images/cancel.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        width: 400,
    },
    cancel: {
        width: 35,
        height: 35,
    },
});

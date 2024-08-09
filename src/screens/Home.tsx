import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from 'react-native';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import { AuthContext } from '../context/authContext';
import { useContext, useRef, useState } from 'react';
import Header from '../components/Header';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = () => {
    const { customer, setAccessToken } = useContext(AuthContext);

    const carouselItems = [
        {
            imgUrl: require('../../assets/images/doctor.png'),
            title: 'Doctor',
        },
        {
            imgUrl: require('../../assets/images/pill.png'),
            title: 'Pharmacy',
        },
        {
            imgUrl: require('../../assets/images/lab.png'),
            title: 'Laboratory',
        },
    ];

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
                <Spinner visible={false} overlayColor={'rgba(0, 0, 0, 0.40)'} />
                <Animated.View
                    entering={FadeInDown.delay(50).duration(500).springify()}
                    className=""
                >
                    <View className="flex flex-row mt-2 mb-8">
                        <Icon name="person-circle-outline" size={23} />
                        <BaseText className="text-base ml-1.5 font-bold text-[#070651]">
                            {'Hi, ' + (customer ? customer.firstName : 'There')}
                        </BaseText>
                    </View>
                    <Header
                        heading={'Discover more about'}
                        noIcon
                        headerStyle={{ width: '90%', marginTop: 10 }}
                    />
                    <Header heading={'your health with '} noIcon headerStyle={{ width: '80%' }} />
                    <Header heading={'HealthE'} noIcon headerStyle={{ color: '#0076FF' }} />
                    <Button
                        buttonText="Check your symptoms"
                        textStyle={{ fontWeight: '500' }}
                        style={{ marginTop: 15 }}
                        onPress={async () => {
                            await AsyncStorage.removeItem('accessToken');
                            setAccessToken('');
                        }}
                    />
                    <BaseText className="text-base mt-14 font-bold text-[#070651]">
                        Find your health provider
                    </BaseText>
                    <ScrollView horizontal>
                        <View className="flex flex-row gap-6 mt-1">
                            {carouselItems.map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => {}}>
                                        <Image style={styles.icons} source={item.imgUrl} />
                                        <Text style={styles.iconTitle}>{item.title}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                    <BaseText className="text-base mt-14 font-bold text-[#070651]">
                        Newsfeed
                    </BaseText>
                </Animated.View>
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icons: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    iconTitle: {
        textAlign: 'center',
        marginTop: 10,
        color: '#515185',
    },
});

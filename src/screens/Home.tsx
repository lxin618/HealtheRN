import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from 'react-native';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import Header from '../components/Header';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useNews } from '../hooks';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface News {
    thread: {
        title: string;
        url: string;
        published: string;
    };
}

export const Home = ({navigation}: any) => {
    const { customer, setAccessToken } = useContext(AuthContext);
    const newsBg = '../../assets/images/news-background.png';
    const [healthNews, setHealthNews] = useState<Array<News>>([]);
    const [newsLoading, setNewsLoading] = useState(true);

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
        {
            imgUrl: require('../../assets/images/radiology.png'),
            title: 'Radiology',
        },
    ];

    const {
        operations: { fetchHealthNews },
    } = useNews();

    useEffect(() => {
        const getNews = async () => {
            try {
                const news = await fetchHealthNews();
                setHealthNews(news);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setNewsLoading(false);
            }
        };
        getNews();
    }, []);

    const convertUnicode = (input: string) => {
        return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
            String.fromCharCode(parseInt(b, 16))
        );
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
                <Spinner visible={false} overlayColor={'rgba(0, 0, 0, 0.40)'} />
                <Animated.View
                    entering={FadeInLeft.delay(50).duration(500).springify()}
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
                            // await AsyncStorage.removeItem('accessToken');
                            // setAccessToken('');
                            navigation.navigate('DiagnoseDisclaimer')
                        }}
                    />
                    <BaseText className="text-base mt-14 font-bold text-[#070651]">
                        Find your health provider
                    </BaseText>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row gap-6 mt-1">
                            {carouselItems.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {}}>
                                        <Image style={styles.icons} source={item.imgUrl} />
                                        <Text style={styles.iconTitle}>{item.title}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                    {healthNews && (
                        <>
                            <BaseText className="text-base mt-10 font-bold text-[#070651]">
                                Newsfeed
                            </BaseText>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View className="flex flex-row gap-5">
                                    {healthNews.map((newsItem, index) => {
                                        const date = new Date(newsItem.thread.published);
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    Linking.canOpenURL(newsItem.thread.url).then(
                                                        (supported: boolean) => {
                                                            if (supported) {
                                                                Linking.openURL(
                                                                    newsItem.thread.url
                                                                );
                                                            } else {
                                                                console.log(
                                                                    "Don't know how to open URI: " +
                                                                        newsItem.thread.url
                                                                );
                                                            }
                                                        }
                                                    );
                                                }}
                                            >
                                                <Image
                                                    style={styles.newsBg}
                                                    source={require(newsBg)}
                                                />
                                                <View style={styles.newsTitleWrapper}>
                                                    <Text style={styles.newsText}>
                                                        {convertUnicode(newsItem.thread.title)}
                                                    </Text>
                                                </View>
                                                <View style={styles.newsDateTitleWrapper}>
                                                    <Text style={styles.newsText}>
                                                        {date.toLocaleDateString()}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </>
                    )}
                </Animated.View>
                <View style={{ height: 20 }} />
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
    newsBg: {
        width: 270,
        height: 270,
        resizeMode: 'contain',
    },
    newsTitleWrapper: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    newsDateTitleWrapper: {
        position: 'absolute',
        top: 150,
        left: 150,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    newsText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    },
    iconTitle: {
        textAlign: 'center',
        marginTop: 10,
        color: '#515185',
    },
});

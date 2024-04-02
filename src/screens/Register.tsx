import { SafeAreaView, ScrollView, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseText from '../components/BaseText';

export const Register = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-12 pl-6">
            <Animated.View 
                entering={FadeInDown.delay(50).duration(500).springify()}
                >
                <Progress.Bar 
                    className="mb-8"
                    borderWidth={0} 
                    progress={0.3} 
                    width={null}
                    unfilledColor="#E6E6EE"
                    borderRadius={0}
                    height={4}
                    />
                <Header heading={'Finish sign up'} noIcon/>
                <View className="flex flex-row mt-7">
                    <Icon name="settings-outline" size={23} />
                    <BaseText 
                        className='text-sm ml-2 font-bold text-[#070651]'>
                        Account set up
                    </BaseText>
                </View>
                
            </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
}
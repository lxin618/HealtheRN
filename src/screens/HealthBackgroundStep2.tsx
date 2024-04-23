import { SafeAreaView, ScrollView, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Bar } from 'react-native-progress';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseText from '../components/BaseText';
import { useHealthBackgroundStep2 } from '../hooks';
import { Controller } from 'react-hook-form';
import { ButtonSmall } from '../components/Button';
import { renderTabs } from '../utils/Tabs';

export const HealthBackgroundStep2 = ({ navigation, route }: any) => {
    const { params } = route;
    const {
        data: { control, errors, isValid, isSubmitting },
        operations: { handleSubmit, onPressSend },
    } = useHealthBackgroundStep2(params);
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
                <Spinner visible={false} overlayColor={'rgba(0, 0, 0, 0.40)'} />
                <Animated.View entering={FadeInDown.delay(50).duration(500).springify()}>
                    <Bar
                        className="mb-8"
                        borderWidth={0}
                        progress={0.75}
                        width={null}
                        unfilledColor="#E6E6EE"
                        borderRadius={0}
                        height={4}
                    />
                    <Header heading={'Finish sign up'} noIcon />
                    <View className="flex flex-row mt-6">
                        <Icon name="heart-pulse" size={24} color={'#070651'} />
                        <BaseText className="text-base ml-3 font-bold text-[#070651]">
                            Health Background
                        </BaseText>
                        <BaseText className="absolute text-base right-5 ml-3 text-[#070651]">
                            (2/2)
                        </BaseText>
                    </View>
                    <View>
                        <BaseText className="leading-6 pt-8 text-md text-[#171B4B]">
                            Do you have high cholesterol levels?
                        </BaseText>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => renderTabs(onChange, value)}
                            name="highCholesterol"
                        />
                    </View>
                    <View>
                        <BaseText className="leading-6 pt-8 text-md text-[#171B4B]">
                            Have you been diagnosed withdiabetes?
                        </BaseText>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => renderTabs(onChange, value)}
                            name="diabetes"
                        />
                    </View>
                    <View>
                        <BaseText className="leading-6 pt-8 text-md text-[#171B4B]">
                            Do you have a family history of chronic diseases such as heart disease,
                            diabetes, or cancer?
                        </BaseText>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => renderTabs(onChange, value)}
                            name="historicalFamilyDiseases"
                        />
                    </View>
                </Animated.View>
            </ScrollView>
            <View className="flex-row justify-around">
                <ButtonSmall
                    style={{ left: 0, backgroundColor: '#F7F7F8' }}
                    buttonText="Back"
                    textStyle={{ color: '#070651' }}
                    onPress={() => navigation.goBack()}
                />
                <ButtonSmall
                    style={{ right: 0, backgroundColor: '#070651' }}
                    textStyle={{ color: '#fff' }}
                    disabled={!isValid || isSubmitting}
                    buttonText="Next"
                    onPress={handleSubmit(onPressSend)}
                />
            </View>
        </SafeAreaView>
    );
};

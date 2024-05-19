import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Bar } from 'react-native-progress';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseText from '../components/BaseText';
import { useHealthBackgroundStep2 } from '../hooks';
import { Controller } from 'react-hook-form';
import { ButtonSmall } from '../components/Button';
import { renderTabs } from '../utils/Tabs';
import { useState } from 'react';
import { ModalWrapper } from '../components/Modal';

const textInfo = {
    'High Cholesterol':
        'High cholesterol is a condition where there is an excess of cholesterol in the blood, increasing the risk of heart disease and stroke. Cholesterol is a fatty substance produced by the liver and found in certain foods.',
    Diabetes:
        "Diabetes is a chronic medical condition where the body is unable to properly regulate blood sugar (glucose) levels, either due to insufficient insulin production (Type 1 diabetes) or the body's inability to use insulin effectively (Type 2 diabetes).",
    'Chronic History':
        'Chronic history refers to the long-term persistence of a disease or condition, characterized by its ongoing, often progressive nature. This term is typically used in medical contexts to describe conditions that last for an extended period',
};

export const HealthBackgroundStep2 = ({ navigation, route }: any) => {
    const { params } = route;
    const {
        data: { control, errors, isValid, isSubmitting },
        operations: { handleSubmit, onPressSend },
    } = useHealthBackgroundStep2(params);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const infoModalContent = () => {
        let dynamicKey = modalContent as keyof typeof textInfo;
        return (
            <View style={{ backgroundColor: 'white', height: 350, borderRadius: 20 }}>
                {/* <BaseText style={style.infoModalHeading}>Sex at birth</BaseText> */}
                <Header heading={modalContent} noIcon headerStyle={style.modalHeader} />
                <View style={{ borderBottomColor: '#E6E6EE', borderBottomWidth: 1 }} />
                <BaseText style={style.infoModalContent}>{textInfo[dynamicKey]}</BaseText>
            </View>
        );
    };

    const hanldeInfoModal = () => {
        const param = {
            isVisible: isModalVisible,
            onClose: () => setModalVisible(false),
            onSwipeComplete: () => setModalVisible(false),
            children: infoModalContent(),
        };
        return ModalWrapper(param);
    };

    const handleIconPress = (key: string) => {
        setModalContent(key);
        setModalVisible(true);
    };

    return (
        <SafeAreaView className="bg-white h-full">
            {hanldeInfoModal()}
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
                        <Icon name="pulse-outline" size={24} color={'#070651'} />
                        <BaseText className="text-base ml-3 font-bold text-[#070651]">
                            Health Background
                        </BaseText>
                        <BaseText className="absolute text-base right-5 ml-3 text-[#070651]">
                            (2/2)
                        </BaseText>
                    </View>
                    <View>
                        <View className="flex flex-row mt-6">
                            <BaseText className="leading-6 text-md text-[#171B4B]">
                                Do you have high cholesterol levels?
                            </BaseText>
                            <Icon
                                onPress={() => handleIconPress('High Cholesterol')}
                                style={style.info}
                                name="information-circle-outline"
                                size={24}
                                color={'#070651'}
                            />
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => renderTabs(onChange, value)}
                            name="highCholesterol"
                        />
                    </View>
                    <View>
                        <View className="flex flex-row mt-6">
                            <BaseText className="leading-6 text-md text-[#171B4B]">
                                Have you been diagnosed with diabetes?
                            </BaseText>
                            <Icon
                                onPress={() => handleIconPress('Diabetes')}
                                style={style.info}
                                name="information-circle-outline"
                                size={24}
                                color={'#070651'}
                            />
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => renderTabs(onChange, value)}
                            name="diabetes"
                        />
                    </View>
                    <View>
                        <View className="flex flex-row mt-6">
                            <BaseText className="leading-6 text-md w-80 text-[#171B4B]">
                                Do you have a family history of chronic diseases such as heart
                                disease, diabetes, or cancer?
                            </BaseText>
                            <Icon
                                onPress={() => handleIconPress('Chronic History')}
                                style={style.info}
                                name="information-circle-outline"
                                size={24}
                                color={'#070651'}
                            />
                        </View>
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

const style = StyleSheet.create({
    info: {
        position: 'absolute',
        right: 0,
        color: '#8B8DA5',
        fontSize: 20,
    },
    infoModalContent: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#070651',
        padding: 20,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 25,
    },
    modalHeader: {
        fontSize: 18,
        padding: 20,
    },
});

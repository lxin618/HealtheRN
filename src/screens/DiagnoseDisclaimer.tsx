import React from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Image, TouchableOpacity } from "react-native"
import Animated, { FadeInLeft } from "react-native-reanimated";
import Header from "../components/Header";
import BaseText from "../components/BaseText";
import Button from "../components/Button";
import { NavigationProp } from '@react-navigation/native';

interface DiagnoseDisclaimerProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export const CheckupHeading = (heading: string, navigation: NavigationProp<ReactNavigation.RootParamList>) => {
	return (
		<View className="flex flex-row pt-2">
			<BaseText className="text-lg mt-2 text-[#515185]">
				{heading}
			</BaseText>
			<View className="flex flex-row-reverse flex-1 top-1">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image style={styles.cancel} source={require('../../assets/images/cancel.png')} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export const DiagnoseDisclaimer = ({navigation}: DiagnoseDisclaimerProps) => {

	const bulletPoints = [
		{ key: 'This app helps you understand your symptoms but does not provide a medical diagnosis or replace healthcare professionals.' },
		{ key: 'For serious or persistent symptoms, consult a healthcare professional. ' },
		{ key: 'In case of an emergency, call 111 immediately.' },
		{ key: 'Your privacy is important to us. We will not use your data to identify you.' },
	]

	return (
		<SafeAreaView className="bg-[#F2F8FF] h-full">
            <View className="container mx-auto px-4 pt-2 pl-6 pr-6">
				<Animated.View
                    entering={FadeInLeft.delay(50).duration(500).springify()}
					className="leading-6"
                	>
					{CheckupHeading('Start Your Self-Checkup', navigation)}
					<Header heading={'This is not a diagnosis'} noIcon headerStyle={styles.header}/>
					<BaseText className="text-lg mt-8 text-[#070651] font-medium">
						Your health is important, and only a licensed medical professional can give you the care and guidance you need.
					</BaseText>
					<FlatList
						data={bulletPoints}
						renderItem={({ item }) => {
							return (
							<View className="pl-2 mt-6">
								<BaseText className="text-lg mt-2 text-[#515185]">{`\u2022 ${item.key}`}</BaseText>
							</View>
							);
						}}
					/>
				</Animated.View>
			</View>
			<View className="" style={styles.button}>
				<Button buttonText='Begin Checkup' onPress={() => navigation.navigate('TravelHistory')} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 30,
		width: 400
	},
	cancel: {
		width: 35,
		height: 35,
		// position: 'absolute',
        // right: 0,
	},
	button: {
		position: 'absolute',
        left: 20,
        right: 20,
        bottom: 80,
	}
  });
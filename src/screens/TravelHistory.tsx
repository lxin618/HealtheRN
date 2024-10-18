import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import BaseText from "../components/BaseText";

export const TravelHistory = () => {
	return (
		<SafeAreaView className="bg-[#F2F8FF] h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
				<Animated.View
                    entering={FadeInDown.delay(50).duration(500).springify()}
					className="leading-6"
                	>
					<BaseText className="text-lg mt-2 text-[#515185]">
						Recent Travel History
					</BaseText>
				</Animated.View>
			</ScrollView>
		</SafeAreaView>
	)
}
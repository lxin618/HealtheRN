import { Image, ScrollView, View, TouchableOpacity, SafeAreaView } from "react-native"
import BaseText from "../components/BaseText"
import Icon from 'react-native-vector-icons/Ionicons';

const Disclaimer = ({ navigation}: any) => {
    return (
        <SafeAreaView>
        <Icon
            name="chevron-back-outline"
            onPress={() => navigation.push('Welcome')}
            style={{ top:20,padding:15}}
            size={32}
        />
        <ScrollView className='container mx-auto px-4 pt-12 pl-6'>
            <View className='flex flex-row'>
                <BaseText className='text-4xl font-bold text-[#070651]'>
                    Diclaimer
                </BaseText>
                <Image style={{ position: 'absolute', bottom: 20, right: 0, height: 60, resizeMode: 'contain' }} source={require('../../assets/images/logo.png')} />
            </View>
            <BaseText className='leading-6 pt-10 text-md text-[#515185]'>
                This self-assessment tool is designed to provide general information and guidance based on the symptoms you input.{"\n"}
            </BaseText>
            <BaseText className='leading-6 text-md text-[#515185]'>
                It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider if you have concerns about your health or if your symptoms worsen. {"\n"}
            </BaseText>
            <BaseText className='leading-6 text-md text-[#515185]'>
                In case of a medical emergency, call 111 or seek immediate medical attention. By using this app, you acknowledge and agree to these terms.{"\n"}
            </BaseText>
        </ScrollView>
        </SafeAreaView>
        )
}



export default Disclaimer
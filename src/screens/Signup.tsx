import {SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import BaseText from '../components/BaseText';

export const Signup = ({navigation}: any) => {
  return (
    <SafeAreaView className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.push('Welcome')}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6">
        <Header heading={'Create an account'} />
        {/* <View
          style={style.btn}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <BaseText className="text-xl font-medium text-white text-center">
              Get started
            </BaseText>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

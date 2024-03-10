import {StyleSheet, TouchableOpacity} from 'react-native';
import BaseText from './BaseText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeIn} from 'react-native-reanimated';

interface Props {
  buttonText: string;
  navigateTo: string;
}

const Button = (props: Props) => {
  const {buttonText, navigateTo} = props;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Animated.View
      entering={FadeIn.delay(50).duration(50).springify()}
      style={style.btn}>
      <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
        <BaseText className="text-xl font-medium text-white text-center">
          {buttonText}
        </BaseText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  btn: {
    bottom: 0,
    top: 15,
    backgroundColor: '#0076FF',
    borderRadius: 100,
    paddingTop: 13,
    paddingBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
});

export default Button;

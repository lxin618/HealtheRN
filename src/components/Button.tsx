import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import BaseText from './BaseText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeIn} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Fontisto';

interface Props {
  buttonText: string;
  navigateTo: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  icon?: string;
}

const Button = (props: Props) => {
  const {buttonText, navigateTo, style, textStyle, icon, iconStyle} = props;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Animated.View
      entering={FadeIn.delay(50).duration(50).springify()}
      style={[styles.btn, style]}>
      <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
        {icon && <Icon style={iconStyle} name={icon} size={25} />}
        <BaseText
          style={textStyle}
          className="text-xl font-medium text-white text-center">
          {buttonText}
        </BaseText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import BaseText from './BaseText';
import Animated, {FadeIn} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CSSProperties } from 'react';

interface Props {
  buttonText: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: CSSProperties;
  iconStyle?: StyleProp<ViewStyle>;
  icon?: string;
  disabled?: boolean;
  onPress: () => void;
}

const Button = (props: Props) => {
  const {buttonText, style, textStyle, icon, iconStyle, onPress, disabled} = props;
  return (
    <TouchableOpacity style={disabled ? {opacity:0.5} : {opacity:1}} disabled={disabled} onPress={onPress}>
      <Animated.View
        entering={FadeIn.delay(50).duration(50).springify()}
        style={[styles.btn, style]}
        >
          {icon && <Icon style={iconStyle} name={icon} size={23} />}
          <BaseText
            style={textStyle}
            className="text-lg font-medium text-white text-center">
            {buttonText}
          </BaseText>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ButtonSmall = (props: Props) => {
  const {buttonText, style, textStyle, onPress, disabled} = props;
  return (
    <TouchableOpacity style={disabled ? {opacity:0.5} : {opacity:1}} disabled={disabled} onPress={onPress}>
      <Animated.View
        entering={FadeIn.delay(50).duration(50).springify()}
        style={[styles.btnSmall, style]}
        >
          <BaseText
            style={textStyle}
            className="text-lg font-medium text-center">
            {buttonText}
          </BaseText>
      </Animated.View>
    </TouchableOpacity>
  );
}

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
    right: 3
  },
  btnSmall: {
    bottom: 50,
    backgroundColor: '#0076FF',
    borderRadius: 100,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
});

export default Button;

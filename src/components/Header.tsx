import {Image, View} from 'react-native';
import BaseText from './BaseText';

type Props = {
  heading: string;
};

const Header = (props: Props) => {
  const {heading} = props;
  return (
    <View className="flex flex-wrap flex-row">
      <Image
        style={{
          position: 'absolute',
          top: -40,
          right: 0,
          height: 60,
          resizeMode: 'contain',
        }}
        source={require('../../assets/images/logo.png')}
      />
      <BaseText
        style={{width: 200}}
        className="text-4xl font-bold text-[#070651]">
        {heading}
      </BaseText>
    </View>
  );
};

export default Header;

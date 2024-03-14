import {Image, View} from 'react-native';
import BaseText from './BaseText';
import phone from '../../assets/images/phone.png';
import logo from '../../assets/images/logo.png';

type Props = {
  heading: string;
  icon?: string;
};

const Header = (props: Props) => {
  const {heading, icon} = props;
  let headerIcon;
  switch (icon) {
    case 'phone':
      headerIcon = phone;
      break;
    default:
      headerIcon = logo;
  }

  return (
    <View className="flex flex-wrap flex-row">
      {headerIcon && (
        <Image
          style={{
            position: 'absolute',
            top: -40,
            right: 0,
            height: 60,
            resizeMode: 'contain',
          }}
          source={headerIcon}
        />
      )}

      <BaseText
        style={{width: 300}}
        className="text-4xl font-bold text-[#070651]">
        {heading}
      </BaseText>
    </View>
  );
};

export default Header;

import {Image, View} from 'react-native';
import BaseText from './BaseText';
import phone from '../../assets/images/phone.png';
import email from '../../assets/images/email.png';
import logo from '../../assets/images/logo.png';

type Props = {
  heading: string;
  icon?: string;
};

const Header = (props: Props) => {
  const {heading, icon = 'logo'} = props;
  const HEADER_IMAGES = {
    logo: {
      uri: require('../../assets/images/logo.png')
    },
    email: {
      uri: require('../../assets/images/email.png')
    },
    phone: {
      uri: require('../../assets/images/phone.png')
    },
    check: {
      uri: require('../../assets/images/check.png')
    }
  }

  let headerIcon
  if (icon == 'phone') {
    headerIcon = HEADER_IMAGES.phone.uri
  }
  else if (icon == 'email') {
    headerIcon = HEADER_IMAGES.email.uri
  }
  else if (icon == 'check') {
    headerIcon = HEADER_IMAGES.check.uri
  }
  else {
    headerIcon = HEADER_IMAGES.logo.uri
  }

  return (
    <View className="flex flex-wrap flex-row">
      {icon && (
        <Image
          style={{
            position: 'absolute',
            top: -40,
            right: 10,
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

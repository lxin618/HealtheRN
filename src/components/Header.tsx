import { Image, View } from 'react-native';
import BaseText from './BaseText';
import { CSSProperties } from 'react';

type Props = {
    heading: string;
    icon?: string;
    noIcon?: boolean;
    headerStyle?: CSSProperties;
};

const Header = (props: Props) => {
    const { heading, icon, noIcon, headerStyle } = props;
    const HEADER_IMAGES = {
        logo: {
            uri: require('../../assets/images/logo_heading.png'),
        },
        email: {
            uri: require('../../assets/images/email.png'),
        },
        phone: {
            uri: require('../../assets/images/phone.png'),
        },
        check: {
            uri: require('../../assets/images/check.png'),
        },
    };

    var headerIcon;
    if (icon == 'phone') {
        headerIcon = HEADER_IMAGES.phone.uri;
    } else if (icon == 'email') {
        headerIcon = HEADER_IMAGES.email.uri;
    } else if (icon == 'check') {
        headerIcon = HEADER_IMAGES.check.uri;
    } else {
        headerIcon = HEADER_IMAGES.logo.uri;
    }

    return (
        <View className="flex flex-wrap flex-row">
            {!noIcon && (
                <Image
                    style={{
                        position: 'absolute',
                        top: -40,
                        right: -7,
                        height: 60,
                        resizeMode: 'contain',
                    }}
                    source={headerIcon}
                />
            )}
            <BaseText
                style={[{ width: 250 }, headerStyle]}
                className="text-3xl font-bold text-[#070651]"
            >
                {heading}
            </BaseText>
        </View>
    );
};

export default Header;

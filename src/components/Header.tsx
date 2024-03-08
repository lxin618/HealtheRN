import { Image, View } from "react-native"
import BaseText from "./BaseText"

type Props = {
    heading: string
}

const Header = (props: Props) => {

    const {heading} = props
    return (
        <View className="flex flex-row">
          <BaseText className="text-4xl font-bold text-[#070651]">
            {heading}
          </BaseText>
          <Image
            style={{
              position: 'absolute',
              bottom: 20,
              right: 0,
              height: 60,
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/logo.png')}
          />
        </View>
    )
}

export default Header
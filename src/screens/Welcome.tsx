import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

export const Welcome = ({navigation}: any) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.imageContainer}>
        <Image source={require('../../assets/images/logo.png')} style={{width: 80, height: 80}}/>
      </View>
      <View style={style.textContainer}>
        <Text style={style.text}>Health</Text>
        <Text style={[style.text, style.textE]}>E</Text>
      </View>
      <Animated.View
        entering={FadeInDown.delay(30).duration(50).springify()}
        style={style.signupBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
          <Animated.Text style={{fontFamily: 'Poppins-Regular'}} className="text-lg font-medium text-white text-center">
            Create an account
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(30).duration(50).springify()}
        style={style.signinBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
          <Animated.Text style={{fontFamily: 'Poppins-Regular'}} className="text-lg font-medium text-[#0076FF] text-center">
            Sign in
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#070651',
  },
  imageContainer: {
    bottom: '5%',
    left: '31%',
  },
  textContainer: {
    flexDirection: 'row',
    left: '16%',
    bottom: '10%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  textE: {
    color: '#0076FF',
  },
  signupBtn: {
    left: '5%',
    bottom: 130,
    position: 'absolute',
    backgroundColor: '#0076FF',
    borderRadius: 100,
    paddingTop: 13,
    paddingBottom: 15,
    textAlign: 'center',
    width: '90%',
  },
  signinBtn: {
    bottom: 60,
    left: '5%',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    paddingTop: 13,
    paddingBottom: 15,
    width: '90%',
  },
});

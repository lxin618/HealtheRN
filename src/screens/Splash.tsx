import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  BounceInUp,
  FadeInLeft,
  FadeInDown,
} from 'react-native-reanimated';

export const Splash = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.imageContainer}>
        <Animated.Image
          entering={FadeInLeft.springify()
            .damping(1)
            .mass(1)
            .stiffness(1)
            .overshootClamping(1)
            .restDisplacementThreshold(0.1)
            .restSpeedThreshold(1)}
          style={{width: 80, height: 80}}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View style={style.textContainer}>
        <Animated.Text
          entering={FadeInDown.springify()
            .damping(1)
            .mass(1)
            .stiffness(1)
            .overshootClamping(10)
            .restDisplacementThreshold(0.1)
            .restSpeedThreshold(5)}
          style={style.text}>
          Health
        </Animated.Text>
        <Animated.Text
          entering={BounceInUp.delay(2500).duration(2000).springify()}
          style={[style.text, style.textE]}>
          E
        </Animated.Text>
      </View>
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

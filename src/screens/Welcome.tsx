import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
  } from 'react-native';
  
  const SplashScreen = ({ navigation}: any) => {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.imageContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <View style={style.textContainer}>
          <Text
            style={style.text}>
            Health
          </Text>
          <Text
            style={[style.text, style.textE]}>
            E
          </Text>
        </View>
        <View
          style={style.signupBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
            <Text className="text-xl font-bold text-white text-center">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={style.signinBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
            <Text className="text-xl font-bold text-[#0076FF] text-center">
              Sign in
            </Text>
          </TouchableOpacity>
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
  
  export default SplashScreen;
  
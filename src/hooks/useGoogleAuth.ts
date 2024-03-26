import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-root-toast';
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithCredential,
} from 'firebase/auth';
import {auth} from '../services/firebase';
import {API_URL} from '../../env/env.json';

export const useGoogleAuth = () => {
  GoogleSignin.configure({
    // TODO move the key to .env
    webClientId:
      '630196583823-scuinvgqc5oboi8hdkjackgsalm1d1o5.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      // this step saves user in firebase db - also result contains the user details
      const result: any = await signInWithCredential(auth, googleCredential);
      // calling a server endpoint to save logged in user details
      const url = `${API_URL}/api/auth/google`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: result._tokenResponse.email,
          phone: result.user.phoneNumber,
          firstName: result._tokenResponse.firstName,
          lastName: result._tokenResponse.lastName,
          photoURL: result.user.photoURL,
        }),
      });
      const res = await response.json();
      const statusCode = response.status;
      if (statusCode != 200) {
        Toast.show(`😕 ${res}`, {
          duration: 5000,
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'red',
        });
        return null;
      } else {
        return res;
      }
    } catch (error: any) {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Toast.show(`😕 Sorry - services not available at the moment`, {
          duration: 5000,
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'red',
        });
        console.log('error', error);
      } else {
        console.log('error', error);
        // play services not available or outdated
        Toast.show(`😕 Sorry - something gone wrong, please try again later`, {
          duration: 5000,
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'red',
        });
      }
    }
  };

  return {signIn};
};

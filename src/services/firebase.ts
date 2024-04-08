// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO move this out to .env
const FirebaseConfig = {
  apiKey: 'AIzaSyBgTIlKMMsCcMMxkj6l--jN653g61ZjAnU',
  authDomain: 'healthe-8ed7a.firebaseapp.com',
  projectId: 'healthe-8ed7a',
  storageBucket: 'healthe-8ed7a.appspot.com',
  messagingSenderId: '630196583823',
  appId: '1:630196583823:web:439a46ed30ccc7138f9ffa',
  measurementId: 'G-NZT0FJ9QS9',
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {app, analytics, db, auth};

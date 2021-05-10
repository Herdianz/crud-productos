import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC6blkSZwqwk5fhHMkMUTyJkPleiDUpjmc",
    authDomain: "jh-crud.firebaseapp.com",
    projectId: "jh-crud",
    storageBucket: "jh-crud.appspot.com",
    messagingSenderId: "671764775814",
    appId: "1:671764775814:web:294fa290afed18f2372207"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
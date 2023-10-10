
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHhi3Txhdki0HyZ09_r9A1l-rmJPiMiZU",
  authDomain: "busdata-auth.firebaseapp.com",
  projectId: "busdata-auth",
  storageBucket: "busdata-auth.appspot.com",
  messagingSenderId: "262738959936",
  appId: "1:262738959936:web:efed1fd9af5ff3b49b09a5",
  measurementId: "G-3CVD2W8BQ0"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0)
{
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const auth = firebase.auth();

export {auth}

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCc80a8qAUAwp9O94k67MCFyMtQCOsVK5U",
  authDomain: "bus-data-570ad.firebaseapp.com",
  projectId: "bus-data-570ad",
  storageBucket: "bus-data-570ad.appspot.com",
  messagingSenderId: "743418887554",
  appId: "1:743418887554:web:24209fad0faf9522a2e39b",
  measurementId: "G-VYTYF54421"
};

if(!firebase.apps.length) 
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
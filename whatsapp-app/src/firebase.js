
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider ,getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyCvcwbyxeDQRMyQ71-7V9lRriQUI2u5JYY",
    authDomain: "whatsapp-app-7a0af.firebaseapp.com",
    projectId: "whatsapp-app-7a0af",
    storageBucket: "whatsapp-app-7a0af.appspot.com",
    messagingSenderId: "170980288486",
    appId: "1:170980288486:web:e0b3c6b2aab730f13e9827",
    measurementId: "G-XELT1TL0YH"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {auth,provider};
export default db;
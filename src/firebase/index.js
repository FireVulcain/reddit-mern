import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "react-mern-cc724.firebaseapp.com",
    projectId: "react-mern-cc724",
    storageBucket: "react-mern-cc724.appspot.com",
    messagingSenderId: "50750721552",
    appId: "1:50750721552:web:d0dfe17e0646a9bdfcc495",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDT2e_bk7zf_ehC9BiLvwdcDdATGHcvXno",
    authDomain: "burger-queen-28f68.firebaseapp.com",
    databaseURL: "https://burger-queen-28f68.firebaseio.com",
    projectId: "burger-queen-28f68",
    storageBucket: "burger-queen-28f68.appspot.com",
    messagingSenderId: "504944122027",
    appId: "1:504944122027:web:5324582841d96389d6bfee",
    measurementId: "G-SQTXHRHT4E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}
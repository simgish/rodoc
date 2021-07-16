import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDfsEpeVt894FwqINTwlbYHwL0ohr4ohUs",
  authDomain: "rodoc-e2871.firebaseapp.com",
  projectId: "rodoc-e2871",
  storageBucket: "rodoc-e2871.appspot.com",
  messagingSenderId: "214485246603",
  appId: "1:214485246603:web:c054af33b19f5d0daeaa8e"
};

console.log('firebaseConfig: ', firebaseConfig);

const initFirebase = firebase.initializeApp(firebaseConfig);
const db = initFirebase.firestore();
const storage = initFirebase.storage();

export { db as default, storage }

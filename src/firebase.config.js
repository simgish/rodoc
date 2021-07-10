import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyDfsEpeVt894FwqINTwlbYHwL0ohr4ohUs",
  authDomain: "rodoc-e2871.firebaseapp.com",
  projectId: "rodoc-e2871",
  storageBucket: "rodoc-e2871.appspot.com",
  messagingSenderId: "214485246603",
  appId: "1:214485246603:web:c054af33b19f5d0daeaa8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;

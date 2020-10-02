import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
} from './constants';

const config = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
};

firebase.initializeApp(config);

const db = firebase.firestore();

// export default db;
export default { db };

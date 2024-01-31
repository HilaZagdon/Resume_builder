
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKo566R2dFDnjCNbjJlcgYmppQz1Gu11E",
  authDomain: "resume-builder-2a366.firebaseapp.com",
  projectId: "resume-builder-2a366",
  storageBucket: "resume-builder-2a366.appspot.com",
  messagingSenderId: "73748076965",
  appId: "1:73748076965:web:ff847fcd6639c35291704c",
  measurementId: "G-3BPQ56XNGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const auth = getAuth(app);
export { dataBase, auth};

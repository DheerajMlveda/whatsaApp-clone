import {initializeApp} from "firebase/app"
import {getAuth ,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDhOChDynTNOxbkdFjVVsKv1Ic9R0dp1bA",
  authDomain: "instagram-clone-e1c1a.firebaseapp.com",
  projectId: "instagram-clone-e1c1a",
  storageBucket: "instagram-clone-e1c1a.appspot.com",
  messagingSenderId: "421912050636",
  appId: "1:421912050636:web:edee9f7139e6f9b77dfb69"
};

const firebaseApp =initializeApp(firebaseConfig)
const db = getFirestore();

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export {auth , provider};

export default db;

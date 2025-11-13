// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh1N-JIRHHkgXyf2L9ESs5NzVBiET0uss",
  authDomain: "plateshare-project-2605d.firebaseapp.com",
  projectId: "plateshare-project-2605d",
  storageBucket: "plateshare-project-2605d.firebasestorage.app",
  messagingSenderId: "672974794889",
  appId: "1:672974794889:web:3c49c2abc1bb4f82b89658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
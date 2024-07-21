import { createContext, useContext } from "react";
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBq5lnVxx7uU_ywKHOQVcLSFDlVmf6czfs",
  authDomain: "user-info-64a5a.firebaseapp.com",
  projectId: "user-info-64a5a",
  storageBucket: "user-info-64a5a.appspot.com",
  messagingSenderId: "400670716077",
  appId: "1:400670716077:web:1c0e7e9be0f6ff73e09624"
};

  export const useFirebase = () => useContext(FirebaseContext);

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider();
  
export const FirebaseProvider = (props)=>{
  const signupUserWithEmailAndPassword = ( email, password) =>
    createUserWithEmailAndPassword(auth,email, password);

  const loginWithUser = (email, password)=>
    signInWithEmailAndPassword(auth, email, password);

  const signinWithGoogle = ()=> 
    signInWithPopup(auth, googleProvider)
return <FirebaseContext.Provider value={{signinWithGoogle, signupUserWithEmailAndPassword, loginWithUser}}>{props.children}</FirebaseContext.Provider>
}



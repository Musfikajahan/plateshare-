import React, { createContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import auth from '../firebase/firebase.config';

// Create the context
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 2. Update User Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: photo
    });
  }

  // 3. Sign In User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 4. Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  // 5. Log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  // 6. Observer: Check for user state changes
  // This is the most important part!
  // It keeps the user logged in on refresh [cite: 19]
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Current user:', currentUser);
      setLoading(false); // Stop loading once we know user status
    });

    // Cleanup function
    return () => {
      return unsubscribe();
    }
  }, []);

  // This is the value that will be passed to all components
  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    googleLogin,
    logOut,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
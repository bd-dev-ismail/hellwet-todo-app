import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  //register user
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //log out
  const logoutUser = () => {
    return signOut(auth);
  };
  //on auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

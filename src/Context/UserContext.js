import React, { createContext, useEffect, useState } from 'react';
import app from './../Firebase/Firebase.config';
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app)




const UserContext = ({ children }) => {


    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

     /// create account through this code
    const createAccount = (email,password) => {
          return createUserWithEmailAndPassword(auth, email, password)
    }

    /// login to account 

    const loginToAccount = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
    }

const logOut = () => {
      return signOut(auth)
}
    /// find and stay current user

    useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, currentUser => {
                    setUser(currentUser)
                    setLoading(false)
            })

            return () => unSubscribe
    },[])

    const authInfo = {createAccount, user,loginToAccount, logOut, loading}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";

import axios from "./../axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                axios.get("/user/userId", { params: { userId: user.uid } }).then((res) => {
                    setCurrentUser(...res.data);
                    setLoading(false);
                });
            } else {
                setCurrentUser(user);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

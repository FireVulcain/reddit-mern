import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import Pusher from "pusher-js";

import axios from "./../axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: "eu",
        });

        const channel = pusher.subscribe("users");

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                channel.bind("inserted", () => {
                    axios.get("/user/userId", { params: { userId: user.uid } }).then((res) => {
                        setCurrentUser(...res.data);
                        setLoading(false);
                    });
                });
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
            channel.unbind_all();
            channel.unsubscribe();
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

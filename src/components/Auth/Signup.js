import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "./../../axios";

import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/scss/main.scss";
import "./Auth.scss";

export const Signup = () => {
    const [alreadyExistUsername, setAlreadyExistUserName] = useState(false);
    const [alreadyExistUserEmail, setAlreadyExistUserEmail] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup, currentUser } = useAuth();
    const history = useHistory();

    const notify = (message) =>
        toast.dark(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: setError(""),
        });

    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    };

    const handleExistUsername = (username) => {
        if (!username) return setAlreadyExistUserName(false);
        axios.get("/user/userName", { params: { userName: username } }).then((res) => {
            if (res.data.length > 0) return setAlreadyExistUserName(true);
            else return setAlreadyExistUserName(false);
        });
    };
    const handleExistEmail = (email) => {
        if (!email) return setAlreadyExistUserEmail(false);
        axios.get("/user/userEmail", { params: { userEmail: email } }).then((res) => {
            if (res.data.length > 0) return setAlreadyExistUserEmail(true);
            else return setAlreadyExistUserEmail(false);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (alreadyExistUsername) return setError("Username already exist");

        if (password !== passwordConfirm) return setError("Passwords do not match");

        try {
            setError("");
            setLoading(true);

            const user = await signup(email, password);
            let data = {
                userId: user.user.uid,
                userEmail: email,
                userName: userName,
                userAvatar:
                    "https://firebasestorage.googleapis.com/v0/b/react-mern-cc724.appspot.com/o/files%2Favatar_default.png?alt=media&token=92d1e7af-d1b1-4f89-a883-5b01828a041d",
                userBanner: "",
                karma: 0,
            };

            axios.post("/users/new", data).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    setLoading(false);
                    return history.push("/");
                }
            });
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) return notify(error);
    }, [error]);

    useEffect(() => {
        if (currentUser) return history.push("/");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spacing-top-header">
            {!currentUser && (
                <div className="auth-container auth-right-panel-active">
                    <div className="auth-form-container auth-sign-up-container">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1>Create Account</h1>

                            <input
                                className={alreadyExistUsername ? "input-error" : ""}
                                ref={userNameRef}
                                type="text"
                                placeholder="Username"
                                onChange={debounce((e) => handleExistUsername(e?.target?.value), 500)}
                            />
                            {alreadyExistUsername && <span className="msg-error">Username already exists</span>}

                            <input
                                className={alreadyExistUserEmail ? "input-error" : ""}
                                ref={emailRef}
                                type="email"
                                placeholder="Email"
                                onChange={debounce((e) => handleExistEmail(e?.target?.value), 500)}
                            />
                            {alreadyExistUserEmail && <span className="msg-error">Email already exists</span>}

                            <input ref={passwordRef} type="password" placeholder="Password" />
                            <input ref={passwordConfirmRef} type="password" placeholder="Password Confirmation" />

                            <button disabled={loading} type="submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="auth-overlay-container">
                        <div className="auth-overlay">
                            <div className="auth-overlay-panel overlay-left">
                                <h1>Hello, Friend!</h1>
                                <p>To stay connected with us please register with your personal info or log in</p>
                                <Link to="/login" className="auth-ghost" id="signIn">
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

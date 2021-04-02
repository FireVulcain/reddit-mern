import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/scss/main.scss";
import "./Auth.scss";

export const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const { login, currentUser } = useAuth();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push("/");
        } catch (error) {
            if (error.code === "auth/wrong-password") setError("Incorrect email or password");
            else setError(error.message);
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
                <div className="auth-container">
                    <div className="auth-form-container auth-sign-in-container">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1>Log in</h1>
                            <input ref={emailRef} type="email" placeholder="Email" />
                            <input ref={passwordRef} type="password" placeholder="Password" />
                            <Link to="/forgot-password">Forgot your password?</Link>
                            <button disabled={loading} type="submit">
                                Log In
                            </button>
                        </form>
                    </div>
                    <div className="auth-overlay-container">
                        <div className="auth-overlay">
                            <div className="auth-overlay-panel auth-overlay-right">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details or create an account</p>
                                <Link to={"/signup"} className="auth-ghost">
                                    Sign Up
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

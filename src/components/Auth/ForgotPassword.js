import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/scss/main.scss";
import "./Auth.scss";

export const ForgotPassword = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();

    const { resetPassword, currentUser } = useAuth();
    const history = useHistory();

    const notifyError = (message) =>
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
            setMessage("");
            setError("");
            setLoading(true);

            await resetPassword(emailRef.current.value);

            setMessage("Check your inbox for further instruction");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) return notifyError(error);
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
                            <h1>Password Reset</h1>
                            {message && <div className="msg-success">{message}</div>}
                            <input ref={emailRef} type="email" placeholder="Email" />
                            <Link to="/login">Log in</Link>
                            <button disabled={loading} type="submit">
                                Reset Password
                            </button>
                        </form>
                    </div>
                    <div className="auth-overlay-container">
                        <div className="auth-overlay">
                            <div className="auth-overlay-panel auth-overlay-right">
                                <h1>Welcome Back!</h1>
                                <p>Change your password to log in or create an account</p>
                                <Link to={"/signup"} className="auth-ghost">
                                    Sign up
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

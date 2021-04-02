import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";

/* Assets */
import "./Nav.scss";
import logo from "./../../assets/images/logo_white.png";

export const Nav = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/login");
        } catch {}
    };

    return (
        <header>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            {currentUser ? (
                <>
                    <button type="submit" onClick={handleLogout}>
                        Log Out
                    </button>
                </>
            ) : (
                <Link to="/login">Log in</Link>
            )}
            <div className="sublist"></div>
            <div className="searchbar"></div>
            <div className="profile"></div>
        </header>
    );
};

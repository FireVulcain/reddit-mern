import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/* Components */
import { CommunitiesDropdown } from "./CommunitiesDropdown";
import { UserDropdown } from "./UserDropdown";

/* Assets */
import "./Navbar.scss";
import logo from "./../../assets/images/logo_white.png";

export const Navbar = () => {
    const { currentUser } = useAuth();

    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="nav-logo-link">
                    <img src={logo} alt="Logo" />
                </Link>
                {currentUser ? (
                    <>
                        <CommunitiesDropdown currentUser={currentUser} />
                        <UserDropdown currentUser={currentUser} />
                    </>
                ) : (
                    <ul className="nav-loggedout-list navbar-nav">
                        <li>
                            <Link className="nav-login-button" to="/login">
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-signup-button" to="/signup">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

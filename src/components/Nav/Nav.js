import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo from "./../../assets/images/logo_white.png";

export const Nav = () => {
    return (
        <header>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="sublist"></div>
            <div className="searchbar"></div>
            <div className="profile"></div>
        </header>
    );
};

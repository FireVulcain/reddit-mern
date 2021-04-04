import React from "react";
import { Link } from "react-router-dom";

export const DropdownMenu = ({ children, position = "center" }) => {
    const availablePosition = ["left", "center", "right"];

    if (!availablePosition.includes(position)) position = "center";

    return <div className={`nav-dropdown ${position ? `nav-dropdown-${position}` : ""}`}>{children}</div>;
};

export const DropdownItem = ({ children, leftIcon, leftImage, path, customClickEvent, setOpen }) => {
    return (
        <Link
            to={path}
            className="nav-dropdown-menu-item"
            onClick={
                customClickEvent
                    ? () => {
                          customClickEvent();
                          setOpen(false);
                      }
                    : () => setOpen(false)
            }
        >
            {leftIcon ? (
                <span className="nav-icon-button">{leftIcon}</span>
            ) : leftImage ? (
                <span className="nav-icon-button">
                    <img src={leftImage} alt="community icon" />{" "}
                </span>
            ) : null}

            {children}
        </Link>
    );
};

import React from "react";
import { Link } from "react-router-dom";

export const DropdownMenu = ({ children, position = "center" }) => {
    const availablePosition = ["left", "center", "right"];

    if (!availablePosition.includes(position)) position = "center";

    return <div className={`nav-dropdown ${position ? `nav-dropdown-${position}` : ""}`}>{children}</div>;
};

export const DropdownItem = ({ children, leftIcon, path, customClickEvent, setOpen }) => {
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
            <span className="nav-icon-button">{leftIcon}</span>
            {children}
        </Link>
    );
};

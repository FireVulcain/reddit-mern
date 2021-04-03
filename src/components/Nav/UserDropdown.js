import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useOutsideClick from "./DropDown/useOutsideClick";

/* Components */
import { NavItem } from "./DropDown/NavItem";
import { DropdownMenu, DropdownItem } from "./DropDown/DropdownMenu";

/* Assets */
import { ReactComponent as Caret } from "./../../assets/icons/caret.svg";
import { RiRadioButtonLine } from "react-icons/ri";
import { GiPointyHat } from "react-icons/gi";
import { ReactComponent as Cog } from "./../../assets/icons/cog.svg";
import { CgProfile, CgLogOut } from "react-icons/cg";

export const UserDropdown = ({ currentUser }) => {
    const { logout } = useAuth();

    const [openUserDropdown, setOpenUserDropdown] = useState(false);
    const userDropdownRef = useRef();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push("/login");
        } catch {}
    };

    useOutsideClick(userDropdownRef, () => {
        if (openUserDropdown) return setOpenUserDropdown(!openUserDropdown);
    });

    return (
        <ul className="navbar-nav" ref={userDropdownRef} onClick={() => setOpenUserDropdown(!openUserDropdown)}>
            <div className="nav-profile-data">
                <div className="nav-profile-data-image">
                    <img src={currentUser.userAvatar} alt="User avatar" />
                    <RiRadioButtonLine />
                </div>
                <div>
                    <p>{currentUser.userName}</p>
                    <div className="nav-profile-data-karma">
                        <GiPointyHat />
                        <p>{currentUser.karma} karma</p>
                    </div>
                </div>
            </div>
            <NavItem icon={<Caret />} open={openUserDropdown}>
                <DropdownMenu position="left">
                    <DropdownItem path={`/u/${currentUser.userName}`} leftIcon={<CgProfile />} setOpen={setOpenUserDropdown}>
                        Profile
                    </DropdownItem>
                    <DropdownItem path={"/settings"} leftIcon={<Cog />} setOpen={setOpenUserDropdown}>
                        User Settings
                    </DropdownItem>
                    <DropdownItem path="/" leftIcon={<CgLogOut />} customClickEvent={handleLogout} setOpen={setOpenUserDropdown}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
        </ul>
    );
};

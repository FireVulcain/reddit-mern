import React, { useState, useRef } from "react";
import useOutsideClick from "./DropDown/useOutsideClick";

/* Components */
import { NavItem } from "./DropDown/NavItem";
import { DropdownMenu, DropdownItem } from "./DropDown/DropdownMenu";

/* Assets */
import { ReactComponent as Caret } from "./../../assets/icons/caret.svg";
import { ReactComponent as Cog } from "./../../assets/icons/cog.svg";
import { CgPen } from "react-icons/cg";

export const CommunitiesDropdown = () => {
    const [openCommunitiesDropdown, setOpenCommunitiesDropdown] = useState(false);
    const communitiesDropdownRef = useRef();

    useOutsideClick(communitiesDropdownRef, () => {
        if (openCommunitiesDropdown) return setOpenCommunitiesDropdown(!openCommunitiesDropdown);
    });

    const simulateCommunites = [];
    for (let i = 0; i < 10; i++) {
        simulateCommunites.push(
            <DropdownItem key={i} path={`/r/subname${i}`} leftIcon={<Cog />} setOpen={setOpenCommunitiesDropdown}>
                r/subname{i}
            </DropdownItem>
        );
    }

    return (
        <div className="navbar-nav" ref={communitiesDropdownRef} onClick={() => setOpenCommunitiesDropdown(!openCommunitiesDropdown)}>
            <NavItem icon={<Caret />} open={openCommunitiesDropdown}>
                <DropdownMenu position="center">
                    <div className="nav-dropdown-title">My communities</div>
                    {simulateCommunites.map((communities) => {
                        return communities;
                    })}
                    <div className="nav-dropdown-title">Other</div>
                    <DropdownItem path={"/settings"} leftIcon={<Cog />} setOpen={setOpenCommunitiesDropdown}>
                        User Settings
                    </DropdownItem>
                    <DropdownItem path="/submit" leftIcon={<CgPen />} setOpen={setOpenCommunitiesDropdown}>
                        Create Post
                    </DropdownItem>
                    <DropdownItem path="/subreddits/create" leftIcon={<CgPen />} setOpen={setOpenCommunitiesDropdown}>
                        Create Community
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
        </div>
    );
};

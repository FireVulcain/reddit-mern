import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "./DropDown/useOutsideClick";
import axios from "./../../axios";

/* Components */
import { NavItem } from "./DropDown/NavItem";
import { DropdownMenu, DropdownItem } from "./DropDown/DropdownMenu";

/* Assets */
import { ReactComponent as Caret } from "./../../assets/icons/caret.svg";
import { ReactComponent as Cog } from "./../../assets/icons/cog.svg";
import { CgPen } from "react-icons/cg";

export const CommunitiesDropdown = ({ currentUser }) => {
    const [openCommunitiesDropdown, setOpenCommunitiesDropdown] = useState(false);
    const [communities, setCommunities] = useState([]);
    const communitiesDropdownRef = useRef();

    useOutsideClick(communitiesDropdownRef, () => {
        if (openCommunitiesDropdown) return setOpenCommunitiesDropdown(!openCommunitiesDropdown);
    });

    useEffect(() => {
        axios.get("/communities/following", { params: { userId: currentUser.userId } }).then((res) => {
            return setCommunities(res.data);
        });
    }, [currentUser]);

    return (
        <div className="navbar-nav" ref={communitiesDropdownRef} onClick={() => setOpenCommunitiesDropdown(!openCommunitiesDropdown)}>
            <NavItem icon={<Caret />} open={openCommunitiesDropdown}>
                <DropdownMenu position="center">
                    {communities.length > 0 && <div className="nav-dropdown-title">My communities</div>}
                    {communities.map((community) => {
                        return (
                            <DropdownItem
                                key={community.communityId}
                                path={`/r/${community.communityName}`}
                                leftImage={community.avatar}
                                setOpen={setOpenCommunitiesDropdown}
                            >
                                r/{community.communityName}
                            </DropdownItem>
                        );
                    })}
                    <div className="nav-dropdown-title">Other</div>
                    <DropdownItem path={"/settings"} leftIcon={<Cog />} setOpen={setOpenCommunitiesDropdown}>
                        User Settings
                    </DropdownItem>
                    <DropdownItem path="/submit" leftIcon={<CgPen />} setOpen={setOpenCommunitiesDropdown}>
                        Create Post
                    </DropdownItem>
                    <DropdownItem path="/community/create" leftIcon={<CgPen />} setOpen={setOpenCommunitiesDropdown}>
                        Create Community
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
        </div>
    );
};

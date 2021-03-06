import React, { useState, useRef } from "react";
import useOutsideClick from "./../Nav/DropDown/useOutsideClick";

export const SelectCommunity = ({ notFollowedCommunities, followedCommunities, selectedCommunity, setSelectedCommunity }) => {
    const [open, setOpen] = useState(false);
    const refOpen = useRef();

    useOutsideClick(refOpen, () => {
        if (open) return setOpen(!open);
    });

    return (
        <div className="submit-community" ref={refOpen}>
            <div className={`submit-community-selected-community`}>
                {selectedCommunity?.avatar ? (
                    <img src={selectedCommunity?.avatar} alt={selectedCommunity?.communityName} />
                ) : (
                    <div className="submit-community-avatar-placeholder"></div>
                )}
                <input
                    type="text"
                    placeholder="Choose a Community"
                    onClick={() => setOpen(!open)}
                    value={
                        selectedCommunity && Object.keys(selectedCommunity).length === 0 && selectedCommunity.constructor === Object
                            ? ""
                            : `r/${selectedCommunity.communityName}`
                    }
                    onChange={(e) => (!e.target.value ? setSelectedCommunity({}) : null)}
                />
            </div>

            {open && (
                <div className="submit-community-dropdown">
                    {followedCommunities.length > 0 && <p>My communities</p>}
                    {followedCommunities.map((community) => {
                        return (
                            <div
                                onClick={() => {
                                    setSelectedCommunity(community);
                                    setOpen(false);
                                }}
                                key={community._id}
                            >
                                <img alt={community?.communityName} src={community?.avatar} />
                                <p>r/{community?.communityName}</p>
                            </div>
                        );
                    })}
                    {notFollowedCommunities.length > 0 && <p>Other</p>}
                    {notFollowedCommunities.map((community) => {
                        return (
                            <div
                                onClick={() => {
                                    setSelectedCommunity(community);
                                    setOpen(false);
                                }}
                                key={community._id}
                            >
                                <img alt={community?.communityName} src={community?.avatar} />
                                <p>r/{community?.communityName}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

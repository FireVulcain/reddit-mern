import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoImageSharp } from "react-icons/io5";
import { RiLinksLine } from "react-icons/ri";

export const TypeSubmit = ({ selected, setSelected }) => {
    return (
        <div className="submit-type-post">
            <button className={selected === "post" ? "active" : null} onClick={() => setSelected("post")}>
                <IoChatbubbleEllipsesOutline /> Post
            </button>
            <button className={selected === "media" ? "active" : null} onClick={() => setSelected("media")}>
                <IoImageSharp /> Images & Video
            </button>
            <button className={selected === "link" ? "active" : null} onClick={() => setSelected("link")}>
                <RiLinksLine /> Link
            </button>
        </div>
    );
};

import React from "react";
import { Link } from "react-router-dom";

/* Assets */
import { FaCommentAlt } from "react-icons/fa";

export const Footer = ({ communityName, idPost, nbComments, postName }) => {
    const formatPostName = (postName) => {
        let name = postName.replace(/[^A-Z0-9]+/gi, "_");

        if (name.charAt(0) === "_") name = name.substring(1);

        return name.toLowerCase();
    };
    return (
        <div className="feed-post-footer">
            <Link to={`/r/${communityName}/comments/${idPost}/${formatPostName(postName)}`}>
                <FaCommentAlt />
                <span>
                    {nbComments} Comment{nbComments > 1 ? "s" : null}
                </span>
            </Link>
        </div>
    );
};

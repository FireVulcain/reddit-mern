import React from "react";
import { Link } from "react-router-dom";

/* Assets */
import { FaCommentAlt } from "react-icons/fa";

export const Footer = ({ communityName, idPost, nbComments }) => {
    return (
        <div className="feed-post-footer">
            <Link to={`/r/${communityName}/comments/${idPost}`}>
                <FaCommentAlt />
                <span>
                    {nbComments} Comment{nbComments > 1 ? "s" : null}
                </span>
            </Link>
        </div>
    );
};

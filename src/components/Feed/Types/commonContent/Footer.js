import React from "react";
import { Link } from "react-router-dom";

/* Assets */
import { FaCommentAlt } from "react-icons/fa";

export const Footer = ({ subName, idPost, nbComments }) => {
    return (
        <div className="feed-post-footer">
            <Link to={`/r/${subName}/comments/${idPost}`}>
                <FaCommentAlt />
                <span>
                    {nbComments} Comment{nbComments > 1 ? "s" : null}
                </span>
            </Link>
        </div>
    );
};

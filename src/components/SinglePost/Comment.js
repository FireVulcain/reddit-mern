import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import parse, { domToReact } from "html-react-parser";
import { useAuth } from "./../../contexts/AuthContext";
import axios from "./../../axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { FaReply } from "react-icons/fa";

export const Comment = ({ comment, setMemoComments }) => {
    const { postId } = useParams();
    const { currentUser } = useAuth();

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (id) => {
        setLoading(true);
        let data = {
            parentId: id,
            postId,
            text,
            user: {
                userId: currentUser.userId,
                userName: currentUser.userName,
                userAvatar: currentUser.userAvatar,
            },
        };

        axios.post("/comments/new", data).then((res) => {
            setOpen(false);
            setText("");
            setMemoComments((prevState) => [res.data, ...prevState]);
            return setLoading(false);
        });
    };

    const nestedComments = (comment.children || []).map((comment) => {
        return <Comment key={comment?._id} comment={comment} setMemoComments={setMemoComments} />;
    });
    return (
        <div className={`single-post-comment-list`}>
            <div className="single-post-comment-content">
                <img src={comment?.user?.userAvatar} alt={`${comment?.user?.userName} profile`} />
                <div>
                    <div>
                        <Link to={`/u/${comment?.user?.userName}`}>{comment?.user?.userName}</Link>
                        <TimeAgo datetime={comment?.createdAt} />
                        <div className="single-post-comment-text">
                            {parse(comment?.text, {
                                replace: (domNode) => {
                                    if (
                                        domNode.name === "h1" ||
                                        domNode.name === "h2" ||
                                        domNode.name === "h3" ||
                                        domNode.name === "h4" ||
                                        domNode.name === "h5" ||
                                        domNode.name === "h6"
                                    )
                                        return <p className={`feed-post-content-${domNode.name}`}>{domToReact(domNode.children)}</p>;
                                },
                            })}
                        </div>
                    </div>
                    <div>
                        {currentUser && (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setOpen(!open);
                                }}
                            >
                                <FaReply />
                                Reply
                            </button>
                        )}
                        {open && (
                            <div className="single-post-reply-container">
                                <button disabled={text === "" || loading} onClick={() => handleSubmit(comment._id)}>
                                    Comment
                                </button>
                                <CKEditor
                                    config={{
                                        toolbar: ["bold", "italic", "link", "NumberedList", "BulletedList", "Blockquote"],
                                        heading: {
                                            options: [
                                                { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                                                { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                                                { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                                                { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                                                { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
                                                { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
                                                { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
                                            ],
                                        },
                                        placeholder: "What are your thoughts",
                                    }}
                                    editor={ClassicEditor}
                                    data={text}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setText(data);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {nestedComments}
        </div>
    );
};

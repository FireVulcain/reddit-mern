import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import axios from "./../../axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/* Components */
import { Feed } from "../Feed/Feed";
import { Comment } from "./Comment";

/* Assets */
import "./SinglePost.scss";

export const SinglePost = () => {
    const { postId } = useParams();
    const history = useHistory();
    const { currentUser } = useAuth();

    const [post, setPost] = useState([]);
    const [memoComments, setMemoComments] = useState([]);
    const [nestedComments, setNestedComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const nestComments = (commentList) => {
        const commentMap = {};

        // move all the comments into a map of id => comment
        commentList.forEach((comment) => (commentMap[comment._id] = comment));

        // iterate over the comments again and correctly nest the children
        commentList.forEach((comment) => {
            if (comment.parentId !== "") {
                const parent = commentMap[comment.parentId];
                (parent.children = []).push(comment);
            }
        });

        // filter the list to return a list of correctly nested comments
        return commentList.filter((comment) => {
            return comment.parentId === "";
        });
    };

    useEffect(() => {
        axios.get("/posts/single", { params: { postId } }).then((res) => {
            if (res.data.length > 0) {
                axios.get("/comments/postId", { params: { postId } }).then((res) => {
                    if (res.data.length > 0) return setMemoComments(res.data);
                });
                return setPost(res.data);
            } else return history.push("/");
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (memoComments.length > 0) return setNestedComments(nestComments(memoComments));
    }, [memoComments]);

    const handleSubmit = () => {
        setLoading(true);
        let data = {
            parentId: "",
            postId,
            text,
            user: {
                userId: currentUser.userId,
                userName: currentUser.userName,
                userAvatar: currentUser.userAvatar,
            },
        };
        axios.post("/comments/new", data).then((res) => {
            setMemoComments((prevState) => [res.data, ...prevState]);
            setText("");
            return setLoading(false);
        });
    };

    return (
        <div className="spacing-top-header single-post">
            {post.length > 0 && <Feed posts={post} isSingle={true} />}
            {currentUser ? (
                <>
                    <span className="single-post-currentuser">
                        Comment as <Link to={`/u/${currentUser.userName}`}>{currentUser.userName}</Link>
                    </span>
                    <div className="single-post-comment-texteditor">
                        <button disabled={text === "" || loading} onClick={() => handleSubmit()}>
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
                </>
            ) : (
                <div className="not-loggedin-comment">
                    <div>
                        <p>Log in or sign up to leave a comment</p>
                        <div>
                            <Link to={"/login"}>Log In</Link>
                            <Link to={"/signup"}>Sign up</Link>
                        </div>
                    </div>
                </div>
            )}
            <div className="single-post-comments-container">
                {nestedComments.map((comment) => {
                    return <Comment key={comment?._id} comment={comment} setMemoComments={setMemoComments} />;
                })}
            </div>
        </div>
    );
};

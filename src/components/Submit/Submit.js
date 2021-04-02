import React, { useState } from "react";
import { storage } from "./../../firebase";
import { useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";

import axios from "./../../axios";
import { TypeSubmit } from "./TypeSubmit";
import { MediaType } from "./MediaType";
import { useAuth } from "./../../contexts/AuthContext";
import "./Submit.scss";

export const Submit = () => {
    const { type } = useParams();

    const [selected, setSelected] = useState(type ?? "post");
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const [url, setUrl] = useState("");

    const { currentUser } = useAuth();

    const validURL = (str) => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" +
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
                "((\\d{1,3}\\.){3}\\d{1,3}))" +
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
                "(\\?[;&a-z\\d%_.~+=-]*)?" +
                "(\\#[-a-z\\d_]*)?$",
            "i"
        );
        return !!pattern.test(str);
    };
    const formatURL = (url) => {
        url = !url.match(/^[a-zA-Z]+:\/\//) ? `https://${url}` : url;
        return url;
    };

    const handleUpload = (e) => {
        e.preventDefault();

        setIsLoading(true);

        let data = {
            title,
            content: selected === "post" ? text : selected === "link" ? formatURL(url) : "",
            type: selected,
            subName: "subname",
            userName: currentUser.userName,
            userId: currentUser.userId,
            nbComments: 0,
            upvotes: 1,
            downvotes: 0,
            media: [],
        };

        if (selected === "media") {
            const promises = [];
            let url = [];

            files.map((file) => {
                let uploadTask = storage
                    .ref(`files/${uuidv4()}`)
                    .put(file)
                    .then((snap) => {
                        return snap.ref.getDownloadURL();
                    })
                    .then((downloadURL) => {
                        url.push({ url: downloadURL, type: file.type });
                    });
                return promises.push(uploadTask);
            });

            Promise.all(promises).then(() => {
                data.media = url;
                axios.post("/posts/new", data).then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        return setIsLoading(false);
                    }
                });
            });
        } else {
            axios.post("/posts/new", data).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    return setIsLoading(false);
                }
            });
        }
    };

    const isDisabled = () => {
        let isDisabled = true;

        if (selected === "post" && title) isDisabled = false;
        if (selected === "media" && files.length > 0 && title) isDisabled = false;
        if (selected === "link" && validURL(url) && title) isDisabled = false;
        if (isLoading) isDisabled = true;

        return isDisabled;
    };

    return (
        <div className="submit-container spacing-top-header">
            <h2>Create a post</h2>

            <div className="submit-wrapper">
                <TypeSubmit selected={selected} setSelected={setSelected} />
                <div className="submit-form-container">
                    <div className="submit-input-title-container">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                if (e.target.value.length <= 300) setTitle(e.target.value);
                            }}
                            placeholder="Title"
                            className="submit-input-title"
                            disabled={isLoading}
                        />
                        <span>{title.length}/300</span>
                    </div>

                    {selected === "post" ? (
                        <CKEditor
                            disabled={isLoading}
                            config={{
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
                                placeholder: "Text (optional)",
                            }}
                            editor={ClassicEditor}
                            data={text}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setText(data);
                            }}
                        />
                    ) : selected === "media" ? (
                        <MediaType isLoading={isLoading} files={files} setFiles={setFiles} />
                    ) : (
                        <input disabled={isLoading} type="text" placeholder="Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    )}

                    <button disabled={isDisabled()} type="submit" className="submit-form-button" onClick={(e) => handleUpload(e)}>
                        {isLoading ? <Loader className="submit-loader" type="ThreeDots" color="#000000" width={20} height={20} /> : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

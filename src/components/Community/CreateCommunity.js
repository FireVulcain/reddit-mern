import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import axios from "./../../axios";
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "./../../contexts/AuthContext";

import { GrCircleInformation } from "react-icons/gr";

import "./CreateCommunity.scss";

export const CreateCommunity = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});

    const { currentUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return setError({ type: "name", message: "A Community Name is required" });
        if (name.length < 3 || name.length > 21 || name.indexOf(" ") >= 0)
            return setError({ type: "name", message: "Make sure your Community Name follows all of the formatting rules" });
        if (!description) return setError({ type: "description", message: "A Community Description is required" });
        if (description.length > 500) return setError({ type: "description", message: "Community Description is too long." });

        setError({});

        let data = {
            communityId: uuidv4(),
            name,
            description,
            members: 1,
            avatar:
                "https://firebasestorage.googleapis.com/v0/b/react-mern-cc724.appspot.com/o/files%2FcommunityIcon.png?alt=media&token=399494d1-ab39-4885-aa8e-52d492777bfc",
            moderatorId: currentUser.userId,
        };

        return axios.get("/communities/communityName", { params: { communityName: name } }).then((res) => {
            if (res.data.length > 0) return setError({ type: "name", message: "This Community Name is already taken" });
            else {
                return axios.post("/communities/new", data).then(() => {
                    return axios.post("/follow/new", { communityId: data.communityId, userId: currentUser.userId, name: data.name });
                });
            }
        });
    };

    return (
        <div className="spacing-top-header create-community">
            <h1>Create a community</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Name*</label>
                    <p className="create-community-community-description">
                        Community names including capitalization cannot be changed.{" "}
                        <GrCircleInformation data-tip="Names cannot have spaces (e.g., r/bookclub not r/book club), must be between 3-21 characters, and underscores (_) are the only special characters allowed. Avoid using solely trademarked names (e.g., r/FansOfAcme not r/Acme)." />
                    </p>
                    <ReactTooltip effect="solid" type="dark" place="bottom" />

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`${error?.type === "name" ? "create-community-error-input" : ""}`}
                    />
                    {error?.type === "name" ? <span className="create-community-error-text">{error?.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="description">Description*</label>
                    <p className="create-community-description">This is how new members come to understand your community</p>
                    <textarea
                        name="description"
                        id="description"
                        maxLength="500"
                        cols="50"
                        rows="2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`${error?.type === "description" ? "create-community-error-input" : ""}`}
                    ></textarea>
                    {error?.type === "description" ? <span className="create-community-error-text">{error?.message}</span> : null}
                </div>
                <button type="submit">Create community</button>
            </form>
        </div>
    );
};

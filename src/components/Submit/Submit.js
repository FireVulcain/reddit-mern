import React, { useRef, useState } from "react";

import { storage } from "./../../firebase";

export const Submit = () => {
    const [image, setImage] = useState(null);
    const inputEl = useRef(null);

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_change",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        inputEl.current.value = null;
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} ref={inputEl} />
            <button onClick={() => handleUpload()}>Upload</button>
        </div>
    );
};

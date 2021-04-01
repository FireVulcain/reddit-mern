import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { TiPlus } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";
import { BsFillTrashFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/scss/main.scss";

export const MediaType = ({ isLoading, files, setFiles }) => {
    const [dropClass, setDropClass] = useState("");

    const notify = (message) =>
        toast.dark(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const handleDelete = (e, id) => {
        e.stopPropagation();
        setFiles((prevState) => prevState.filter((image) => image.id !== id));
    };

    const handleDrop = (dropFile) => {
        if (!dropFile.length) return;

        if (dropFile.length > 1) {
            dropFile = dropFile.filter((file) => {
                if (file.type.includes("video")) notify("Videos aren’t supported within galleries...yet");
                return !file.type.includes("video");
            });
        }

        if (
            (files.length > 0 && files[0].type.includes("image") && dropFile[0].type.includes("video")) ||
            (files.length > 0 && files[0].type.includes("video"))
        ) {
            notify("Videos aren’t supported within galleries...yet");
            return setDropClass("");
        }

        setFiles((existingImages) => [
            ...existingImages,
            ...dropFile.map((image) => Object.assign(image, { preview: URL.createObjectURL(image), id: uuidv4() })),
        ]);
        setDropClass("");
    };

    return (
        <div>
            <Dropzone
                accept="image/png, image/gif, image/jpeg, image/webp, video/mp4, video/quicktime"
                onDragOver={() => setDropClass("submit-dragndrop-enter")}
                onDragEnter={() => setDropClass("submit-dragndrop-enter")}
                onDragLeave={() => setDropClass("")}
                onDropRejected={() => notify("Sorry, we accept only images (.png, .jpeg, .gif, .webp) and videos (.mp4, .mov)")}
                onDrop={(dropFile) => handleDrop(dropFile)}
                disabled={isLoading}
            >
                {({ getRootProps, getInputProps, open }) => (
                    <section
                        {...getRootProps()}
                        className={`${dropClass} ${files.length > 0 ? "submit-image-added" : ""} submit-dragndrop-container`}
                    >
                        {files.length > 0 ? (
                            <>
                                {files.map((file, key) => {
                                    if (file.type.includes("video")) {
                                        return (
                                            <div className="video-container" key={key}>
                                                <video autoPlay={true} muted controls>
                                                    <source src={file.preview} />
                                                </video>
                                                {!isLoading ? (
                                                    <div className="delete-video-container" onClick={(e) => handleDelete(e, file.id)}>
                                                        <BsFillTrashFill className="delete-image-button" />
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <span key={key} style={{ backgroundImage: `url(${file.preview})` }} onClick={(e) => e.stopPropagation()}>
                                                {!isLoading ? (
                                                    <TiDelete className="delete-image-button" onClick={(e) => handleDelete(e, file.id)} />
                                                ) : null}
                                            </span>
                                        );
                                    }
                                })}
                                {files.length >= 1 && !files[0].type.includes("video") && !isLoading ? (
                                    <div>
                                        <input {...getInputProps()} />
                                        <div className="add-more-media">
                                            <TiPlus />
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <div className="dragndrop-text">
                                <input {...getInputProps()} />
                                <p>Drag and drop images or</p>
                                <button type="button" onClick={open}>
                                    Upload
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </Dropzone>
            <ToastContainer />
        </div>
    );
};

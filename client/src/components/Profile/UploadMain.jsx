import React, { useState, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const UploadMain = ({
  isUploadPageOpen,
  HandleUploadPage,
  whichComponentState,
  setWhichComponentState,
}) => {
  const [inputImage, setInputImage] = useState();
  const [size, setSize] = useState(0);
  const [fileLargeMsg, setFileLargeMsg] = useState(false);
  const [img, setImg] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  // Calculating the length of the image name
  let lengthOfName;
  if (imageName) {
    lengthOfName = imageName.length;
  }

  // onChange handling
  const OnChangeImage = (e) => {
    setInputImage(e.target.files[0]);
    setSize(e.target.files[0].size);
    setImageName(e.target.files[0].name);
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const profilePicSubmit = async (e) => {
    e.preventDefault();
    const maxSize = 1500000;
    // checking the file size
    if (size > maxSize) {
      return setFileLargeMsg(true);
    } else {
      const data = new FormData();
      if (whichComponentState === "profile") {
        data.append("articleImage", inputImage);
        axios
          .post("http://localhost:4100/users/uploads/profile", data, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data === "successfully saved profile image to db!") {
              console.log(res.data);
              setImg(null);
              setImageName(null);
              setSuccessMsg(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (whichComponentState === "cover") {
        data.append("coverUpload", inputImage);
        axios
          .post("http://localhost:4100/users/uploads/cover", data, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data === "successfully saved cover image to db!") {
              console.log(res.data);
              setImg(null);
              setImageName(null);
              setSuccessMsg(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    const autoClose = setTimeout(() => {
      setFileLargeMsg(false);
    }, 2000);
    return () => {
      clearTimeout(autoClose);
    };
  }, [fileLargeMsg]);

  useEffect(() => {
    const autoSuccess = setTimeout(() => {
      setSuccessMsg(null);
    }, 5000);
    return () => {
      clearTimeout(autoSuccess);
    };
  }, [successMsg]);

  return (
    <div
      className={`${
        isUploadPageOpen
          ? "upload-main-container showUploadPage"
          : "upload-main-container"
      }`}
    >
      {fileLargeMsg ? (
        <div className="fileSizeUploadMsg">
          <h1>
            Can't upload more than <b className="mb-limit">1.5mb</b> picture
          </h1>
        </div>
      ) : null}
      <nav className="profileUploadNav  bg-light p-4">
        <aside className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center">
            <p className="back-profile">
              <FaArrowLeft
                onClick={() => {
                  HandleUploadPage();
                  setWhichComponentState(null);
                }}
              />
            </p>
            <p className="ms-2">Select photo</p>
          </div>
          <div className="ms-auto">
            <p
              onClick={() => {
                HandleUploadPage();
                setWhichComponentState(null);
              }}
              className=" mt-1"
            >
              Cancel
            </p>
          </div>
        </aside>
      </nav>
      <form
        onSubmit={profilePicSubmit}
        encType="multipart/form-data"
        className="img-form-container"
      >
        <div>
          <label htmlFor="imageFile" className="upload-label">
            {!img
              ? "Add a Picture"
              : `${imageName.slice(0, 4)}.....${imageName.slice(
                  lengthOfName / 2 + lengthOfName / 3,
                  lengthOfName
                )}`}
            <br />
            <AiFillCamera />
          </label>
        </div>
        <input
          type="file"
          id="imageFile"
          name={
            whichComponentState === "profile"
              ? "articleImage"
              : whichComponentState === "cover"
              ? "coverUpload"
              : ""
          }
          capture="user"
          accept="image/*"
          onChange={OnChangeImage}
        />
        <button type="submit" className="login-btn">
          Upload
        </button>
        {successMsg ? (
          <h2 className="no-img">{successMsg}</h2>
        ) : !img && !imageName ? (
          <h2 className="no-img">No image Selected!</h2>
        ) : (
          <>
            <img src={img} alt="" className="uploading-prof-check" />
          </>
        )}
      </form>
    </div>
  );
};

export default UploadMain;

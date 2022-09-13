import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImCamera } from "react-icons/im";

const ProfilePic = ({
  OpenPopUpCover,
  coverPicture,
  profilePicture,
  OpenPopUpProfile,
  setIsProfilePicClicked,
}) => {
  return (
    <>
      <LazyLoadImage
      onClick={OpenPopUpCover}
        src={coverPicture}
        effect="blur"
        alt=""
        width={`${100}%`}
        className="sub-img-profile"
      />
      <div className="pro-back">
        <LazyLoadImage
          src={profilePicture}
          onClick={() => {
            OpenPopUpProfile();
            setIsProfilePicClicked(true);
          }}
          alt=""
          width={150}
          effect="blur"
          className="img-profile"
        />
        <button
          onClick={OpenPopUpProfile}
          type="button"
          className="profile-upload-button d-flex align-items-center justify-content-center"
        >
          <ImCamera />
        </button>
      </div>
    </>
  );
};

export default ProfilePic;

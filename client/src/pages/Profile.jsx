import React, { useState } from "react";
import { MyGlobalPropsProvider } from "../context";
import axios from "axios";
import { ImCamera } from "react-icons/im";
import PopupProfile from "../components/Profile/Popup-profile-cover/PopupProfile";
import PopupCover from "../components/Profile/Popup-profile-cover/PopUpCover";
import ProfileText from "../components/Profile/ProfileText";
import UploadMain from "../components/Profile/UploadMain";
import profileAvater from "../assets/profileAvater.png";
import coverAvater from "../assets/coverAvater.jpg";
import ProfilePic from "../components/Profile/Profile-cover/Profile.Cover.Picture";
import ViewPicture from "../components/Profile/view.picture";

import "../components/Profile/profile.css";

const Profile = () => {
  const { myAuth, setLogoutMsg, loading } = MyGlobalPropsProvider();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenCover, setIsOpenCover] = useState(false);
  const [isUploadPageOpen, setIsUploadPageOpen] = useState(false);
  const [openViewPic, setOpenViewPic] = useState(false);
  const [whichComponentState, setWhichComponentState] = useState(null);
  const [isProfilePicClicked, setIsProfilePicClicked] = useState(null);

  // configuring profile image
  let profilePicture = profileAvater;
  if (myAuth && myAuth.profilePic) {
    profilePicture = `/uploads/profile/${myAuth.profilePic}`;
  }
  // configuring cover photo image
  let coverPicture = coverAvater;
  if (myAuth && myAuth.coverPic) {
    coverPicture = `/uploads/cover/${myAuth.coverPic}`;
  }

  // this for button pop-up profile content
  const OpenPopUpProfile = () => {
    setIsOpenProfile((previous) => !previous);
  };
  // this for button pop-up cover content
  const OpenPopUpCover = () => {
    setIsOpenCover((previous) => !previous);
  };

  const HandleUploadPage = () => {
    setIsUploadPageOpen((previous) => !previous);
  };
  console.log(whichComponentState);

  const handleLogout = () => {
    axios
      .get("http://localhost:4100/logout", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setLogoutMsg(res.data);
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };
  if (myAuth) {
    const { id, username, profilePic } = myAuth;
  }
  if (loading) {
    return <h1>This page is loading!</h1>;
  }
  return (
    <div className="profile-background">
      <section className="img-container">
        <ProfilePic
          OpenPopUpCover={OpenPopUpCover}
          OpenPopUpProfile={OpenPopUpProfile}
          profilePicture={profilePicture}
          coverPicture={coverPicture}
          setIsProfilePicClicked={setIsProfilePicClicked}
        />
        <button
          onClick={OpenPopUpCover}
          type="button"
          className=" sub-upload-btn d-flex align-items-center justify-content-center"
        >
          <ImCamera />
        </button>
      </section>
      <ProfileText myAuth={myAuth} handleLogout={handleLogout} />
      <PopupProfile
        isProfilePicClicked={isProfilePicClicked}
        setIsProfilePicClicked={setIsProfilePicClicked}
        isOpen={isOpenProfile}
        OpenPopUp={OpenPopUpProfile}
        HandleUploadPage={HandleUploadPage}
        setWhichComponentState={setWhichComponentState}
        setOpenViewPic={setOpenViewPic}
      />
      <PopupCover
        isOpen={isOpenCover}
        OpenPopUp={OpenPopUpCover}
        HandleUploadPage={HandleUploadPage}
        setWhichComponentState={setWhichComponentState}
        setOpenViewPic={setOpenViewPic}
      />

      <UploadMain
        isUploadPageOpen={isUploadPageOpen}
        HandleUploadPage={HandleUploadPage}
        whichComponentState={whichComponentState}
        setWhichComponentState={setWhichComponentState}
      />
      <ViewPicture
        openViewPic={openViewPic}
        setOpenViewPic={setOpenViewPic}
        whichComponentState={whichComponentState}
        setWhichComponentState={setWhichComponentState}
        profilePicture={profilePicture}
        coverPicture={coverPicture}
      />
    </div>
  );
};

export default Profile;

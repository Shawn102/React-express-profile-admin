import React from "react";
import { ImFilePicture } from "react-icons/im";
import { IoMdContact } from "react-icons/io";
import { GiWoodFrame } from "react-icons/gi";
import { MdFaceRetouchingNatural } from "react-icons/md";

const PopupProfile = ({
  isProfilePicClicked,
  setIsProfilePicClicked,
  isOpen,
  OpenPopUp,
  HandleUploadPage,
  setWhichComponentState,
  setOpenViewPic,
}) => {
  return (
    <section
      onClick={() => {
        OpenPopUp();
        setIsProfilePicClicked(false);
      }}
      className={`${isOpen ? "show-popup-section" : ""} pop-up-section`}
    >
      <ul className={`${isOpen ? "popup-links" : ""} list-group`}>
        <li className="list-group-item d-flex align-items-center">
          <button className="d-flex align-items-center justify-content-center button-pop-up ">
            <GiWoodFrame />
          </button>
          <span>Add Frame</span>
        </li>
        <li
          onClick={() => {
            HandleUploadPage();
            setWhichComponentState("profile");
          }}
          className="list-group-item d-flex align-items-center"
        >
          <button className="d-flex align-items-center justify-content-center button-pop-up ">
            <ImFilePicture />
          </button>
          <span>Select Profile Picture</span>
        </li>
        {isProfilePicClicked && (
          <li
            onClick={() => {
              setOpenViewPic(true);
              setWhichComponentState("profile");
            }}
            className="list-group-item d-flex align-items-center"
          >
            <button className="d-flex align-items-center justify-content-center button-pop-up ">
              <IoMdContact />
            </button>
            <span>View Profile Picture</span>
          </li>
        )}
        <li className="list-group-item d-flex align-items-center">
          <button className="d-flex align-items-center justify-content-center button-pop-up ">
            <MdFaceRetouchingNatural />
          </button>
          <span>Create avatar profile picture</span>
        </li>
      </ul>
    </section>
  );
};

export default PopupProfile;

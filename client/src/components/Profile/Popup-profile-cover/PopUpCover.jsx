import React from "react";
import {AiFillPicture} from 'react-icons/ai';
import {TbUpload} from 'react-icons/tb';
import {MdFaceRetouchingNatural} from 'react-icons/md';

const PopupCover = ({ isOpen, OpenPopUp, HandleUploadPage, setWhichComponentState, setOpenViewPic }) => {
  
    return (
      <section
        onClick={OpenPopUp}
        className={`${isOpen ? "show-popup-section" : ""} pop-up-section`}
      >
        <ul className={`${isOpen ? "popup-links" : ""} list-group`}>
          <li onClick={() => {setOpenViewPic(true);
          setWhichComponentState("cover")}}
            className="list-group-item d-flex align-items-center"
          >
            <button className="d-flex align-items-center justify-content-center button-pop-up ">
              <AiFillPicture />
            </button>
            <span>View profile cover</span>
          </li>
          <li onClick={() => {
            HandleUploadPage()
            setWhichComponentState("cover")
          }} className="list-group-item d-flex align-items-center">
            <button className="d-flex align-items-center justify-content-center button-pop-up ">
              <TbUpload />
            </button>
            <span>Upload Photo</span>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <button className="d-flex align-items-center justify-content-center button-pop-up ">
              <MdFaceRetouchingNatural />
            </button>
            <span>Create avatar cover photo</span>
          </li>
        </ul>    
      </section>
    );
  };
  
  export default PopupCover;
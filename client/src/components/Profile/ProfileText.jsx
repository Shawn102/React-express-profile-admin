import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";

const ProfileText = ({ handleLogout }) => {
  return (
    <section className="section-text">
      <h2 className="section-text-h1">Md Niamul Hakim(Shawn)</h2>
      <article className="d-flex align-items-center justify-content-center flex-wrap edit-btn-containers">
        <button
          type="button"
          className="btn btn-primary btn-sm m-1 d-flex align-items-center edit-text-btn-bi"
        >
          <AiFillPlusCircle className="mg-btn-edit" /> <span>Share post</span>
        </button>
        <button
          type="button"
          className="btn btn-dark btn-sm me-1 d-flex align-items-center edit-text-btn-bi"
        >
          <MdEdit className="mg-btn-edit" /> <span>Edit profile</span>
        </button>
        <button type="button" className="btn btn-dark btn-sm edit-text-btn-bi">
          <BsThreeDots />
        </button>
      </article>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default ProfileText;

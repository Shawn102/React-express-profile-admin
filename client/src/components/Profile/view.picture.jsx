import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";

const ViewPicture = ({
  openViewPic,
  setOpenViewPic,
  whichComponentState,
  setWhichComponentState,
  profilePicture,
  coverPicture,
}) => {
  const [isTrue, setIsTrue] = useState(true);
  useEffect(() => {
    const auto = setTimeout(() => {
      setIsTrue(false);
    }, 700);
    return () => {
      clearTimeout(auto);
    };
  }, [openViewPic === true]);
  useEffect(() => {
    setIsTrue(true);
  }, [openViewPic === false]);

  return (
    <section
      className={`view-pic ${openViewPic ? "show-popup-view-picture" : ""}`}
    >
      <div className="view-pic-relative">
        <img
          src={
            whichComponentState === "profile"
              ? profilePicture
              : whichComponentState === "cover"
              ? coverPicture
              : null
          }
          alt=""
          className="view-picture"
          style={
            whichComponentState === "profile"
              ? { borderRadius: !isTrue ? "0" : "50%" }
              : null
          }
        />
        <button
          onClick={() => {
            setIsTrue(false);
            setOpenViewPic(false);
            setWhichComponentState(null);
          }}
          className="view-cross-btn"
        >
          <ImCross />
        </button>
      </div>
    </section>
  );
};

export default ViewPicture;

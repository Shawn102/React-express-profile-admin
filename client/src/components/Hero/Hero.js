import React from "react";

const Hero = ({ heroClass, children }) => {
  return <div className={`login ${heroClass}`}>{children}</div>;
};

export default Hero;

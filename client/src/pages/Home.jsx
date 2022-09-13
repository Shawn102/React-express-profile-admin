import React from "react";
import { Link } from "react-router-dom";
import { MyGlobalPropsProvider } from "../context";

const Home = () => {
  const { myAuth } = MyGlobalPropsProvider();
  return (
    <div className="home-bc d-flex align-items-center justify-content-center">
      <div>
        <h1>
          Organize your daily
          <br /> work with Todos
        </h1>
        <p className="home-p">Todos lets you keep track of everything in one place.</p>
        <div className="d-flex justify-content-center">
          <Link to={myAuth ? "/profile" : "/login"} className="btn btn-danger btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { MyGlobalPropsProvider } from "../../context";
import "./Navbar.css";

const Navbar = () => {
  const { myAuth } = MyGlobalPropsProvider();
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <button>Todos</button>
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            {!myAuth && (
              <li className="nav-item nav-regi-logi">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <b className="regi-li-patition">|</b>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            {myAuth ? (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

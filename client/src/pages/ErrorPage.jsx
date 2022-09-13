import { Button } from "bootstrap";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typed from 'typed.js';

const ErrorPage = () => {
    const navigate = useNavigate();
    const typed = useRef(null);
    useEffect(() => {
        const options = {
            strings: [
            "This page doesn't exist",
            "<b style='color:gold'>Or</b>",
            "You don't have permission to access.",
            "Please back to home"
          ],
          typeSpeed: 150,
          backSpeed: 20,
          loop: true
        };
        
        // elRef refers to the <span> rendered below
        typed.current = new Typed("#typed1", options);
        
        return () => {
          // Make sure to destroy Typed instance during cleanup
          // to prevent memory leaks
          typed.current.destroy();
        }
      }, [])
  return (
    <div className="d-flex align-items-center justify-content-center text-center p-3 error-page-custom-class">
      <div>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>
          <h1 className="error-h1">Opps</h1>
          <h2 className="error-h1">404 occured :(</h2>
          <p className="home-p">
            <span id="typed1"></span>
          </p>
          {/* This page doesn't exist or you don't have permission
          to access this page! */}
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-primary bg-warning">
          Back to previous page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

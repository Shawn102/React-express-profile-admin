import React, { useState, useEffect } from "react";
import googleLogo from "../../assets/google.png";
import githubLogo from "../../assets/github.png";
import move from "../../assets/move.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { MyGlobalPropsProvider } from "../../context";

const Register = () => {
  const { setRegisterMsg, setMyAuth } = MyGlobalPropsProvider();
  const navigate = useNavigate();
  const [backendMsg, setBackEndMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);
  const [inputFormValue, setInputFormValue] = useState({
    username: "",
    phone: "",
    password: "",
    isAdmin: false,
    adminPassword: "",
  });

  // Handle input onChange
  const handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputFormValue((previous) => {
      return { ...previous, [name]: value };
    });
  };
  const handleRegiOnSubmit = (e) => {
    e.preventDefault();
    const { username, password, phone, isAdmin, adminPassword } =
      inputFormValue;
    // Posting data to backend
    axios
      .post(
        "http://localhost:4100/register",
        { username, password, phone, isAdmin, adminPassword },
        { withCredentials: true }
      )
      .then((res) => {
        if (
          res.data ===
          "Improper values please check username or password is valid!"
        ) {
          setBackEndMsg(res.data);
        } else if (res.data === "Same username found. Can't register") {
          setBackEndMsg(res.data);
        } else if (res.data === "Successfully registered!") {
          setRegisterMsg(res.data);
          navigate("/login");
        } else if (res.data === "Admin password is incorrect!") {
          setBackEndMsg(res.data);
        }
        setInputFormValue({
          username: "",
          phone: "",
          password: "",
          isAdmin: false,
          adminPassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handling hiding password
  const handlingHidePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => {
      if (inputFormValue.password === "") {
        setMsg("Empty field");
      } else {
        return !prev;
      }
    });
  };
  useEffect(() => {
    const autoMsg = setTimeout(() => {
      setMsg(null);
    }, 1500);
    return () => {
      clearTimeout(autoMsg);
    };
  }, [msg]);
  useEffect(() => {
    const autoMsg = setTimeout(() => {
      setBackEndMsg(null);
    }, 3500);
    return () => {
      clearTimeout(autoMsg);
    };
  }, [backendMsg]);

  return (
    <Hero heroClass="regibc">
      <div className="login-tag">
        {backendMsg ? <h1>{backendMsg}</h1> : null}
        <h1 className="regi-h1">Register</h1>
        <div className="login-form-area">
          <form onSubmit={handleRegiOnSubmit} className="log-form">
            <label htmlFor="username" className="label1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={handleOnChange}
              value={inputFormValue.username}
              placeholder="Your Email"
              className="input-login"
              autoComplete="off"
            />
            <label htmlFor="phone" className="label1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleOnChange}
              value={inputFormValue.phone}
              className="input-login"
              placeholder="+88 (optional)"
              autoComplete="off"
            />
            <div className="pos-pass-relative">
              {msg ? <p className="p-absolute">{msg}</p> : null}
              <label htmlFor="password" className="label1">
                Password:
              </label>
              <div className="password-div-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleOnChange}
                  value={inputFormValue.password}
                  placeholder="Password"
                  className="input-login"
                  autoComplete="off"
                />
                <button
                  onClick={handlingHidePassword}
                  className="password-show-btn"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>
            {inputFormValue.isAdmin ? (
              <>
                <label htmlFor="adminpassword" className="label1">
                  Admin Pin:
                </label>
                <input
                  type="password"
                  name="adminPassword"
                  onChange={handleOnChange}
                  className="input-login"
                  placeholder="Enter Secret Pin"
                  autoComplete="off"
                />
              </>
            ) : null}
            <div className="admin-container">
              <input
                type="checkbox"
                name="isAdmin"
                className="checkbox-class"
                onChange={handleOnChange}
              />
              <span className="spn-admin">Register as Admin?</span>
            </div>
            <button type="submit" className="login-btn">
              SIGN UP
            </button>
          </form>
          {/* <div className="google-margin-center">
            <a className="goolge-a-login" href="/auth/google">
              <button className="google-login-button">
                <img src={googleLogo} alt="" className="google-logo" />
                Register with Google
              </button>
            </a>
            <a className="goolge-a-login" href="/auth/github">
              <button className="google-login-button">
                <img src={githubLogo} alt="" className="google-logo" />
                Register with Github
              </button>
            </a>
          </div> */}
        </div>
        <p className="register-p">
          Already have an account?
          <Link to="/login" className="create-account-a">
            Login Instead
            <img src={move} alt="" className="google-logo" />
          </Link>
        </p>
      </div>
    </Hero>
  );
};

export default Register;

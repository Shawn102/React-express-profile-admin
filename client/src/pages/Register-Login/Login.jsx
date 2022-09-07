import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";
import githubLogo from "../../assets/github.png";
import move from "../../assets/move.png";
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Hero from "../../components/Hero/Hero";
import axios from "axios";
import { MyGlobalPropsProvider } from "../../context";

const Login = () => {
  const { registerMsg, setRegisterMsg, setLoginMsg } = MyGlobalPropsProvider();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);

  // handle on Change of inputs
  const LoginOnChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((previous) => {
      return { ...previous, [name]: value };
    });
  };

  const HandleOnLoginSubmit = (e) => {
    e.preventDefault();
    // destructuring the "loginForm" state values
    const { username, password } = loginForm;
    axios
      .post(
        "http://localhost:4100/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          if (res.data === "Please check your username and password!") {
            setMsg(res.data);
          } else if (res.data === "Successfully authenticated!") {
            setLoginMsg(res.data);
            window.location.href="/profile"
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // handling hiding password
  const handlingHidePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => {
      if (loginForm.password === "") {
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
      setRegisterMsg(null);
    }, 2500);
    return () => {
      clearTimeout(autoMsg);
    };
  }, [registerMsg]);
  return (
    <Hero heroClass="logibc">
      <div className="login-tag login-extra">
        {registerMsg ? <h1>{registerMsg}</h1> : null}
        <h1>User Login</h1>
        <div className="login-form-area">
          <form onSubmit={HandleOnLoginSubmit} className="log-form">
            <input
              type="text"
              name="username"
              onChange={LoginOnChange}
              value={loginForm.username}
              placeholder="User@name"
              className="input-login"
              autoComplete="off"
            />
            <div className="pos-pass-relative">
              {msg ? <p className="p-absolute">{msg}</p> : null}
              <div className="password-div-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={LoginOnChange}
                  value={loginForm.password}
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
            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
          <div className="google-margin-center">
            <a className="goolge-a-login" href="/auth/google">
              <button className="google-login-button">
                <img src={googleLogo} alt="" className="google-logo" />
                Login with Google
              </button>
            </a>
            <a className="goolge-a-login" href="/auth/github">
              <button className="google-login-button">
                <img src={githubLogo} alt="" className="google-logo" />
                Login with Github
              </button>
            </a>
          </div>
        </div>
        <p>
          Don't have account?
          <Link to="/register" className="create-account-a">
            Create new account
            <img src={move} alt="" className="google-logo" />
          </Link>
        </p>
      </div>
    </Hero>
  );
};

export default Login;

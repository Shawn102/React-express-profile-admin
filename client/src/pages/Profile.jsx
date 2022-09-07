import React from "react";
import { MyGlobalPropsProvider } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { myAuth, setLogoutMsg } = MyGlobalPropsProvider();

  const handleLogout = () => {
    axios
      .get("http://localhost:4100/logout", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setLogoutMsg(res.data);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Welcome to profile</h1>
      <h2>Thanks for login {myAuth.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

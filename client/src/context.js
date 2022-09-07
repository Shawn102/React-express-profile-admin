import React, { useState, createContext, useContext, useEffect } from "react";

import axios from "axios";

const myContext = createContext();

export const MyAppProvider = ({ children }) => {
  const [myAuth, setMyAuth] = useState(null);
  const [registerMsg, setRegisterMsg] = useState(null);
  const [loginMsg, setLoginMsg] = useState(null);
  const [logoutMsg, setLogoutMsg] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4100/users", { withCredentials: true })
      .then((res) => setMyAuth(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <myContext.Provider
      value={{
        myAuth,
        registerMsg,
        setRegisterMsg,
        loginMsg,
        setLoginMsg,
        logoutMsg,
        setLogoutMsg,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export const MyGlobalPropsProvider = () => {
  return useContext(myContext);
};

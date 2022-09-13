import React, { useState, createContext, useContext, useEffect } from "react";

import axios from "axios";

const myContext = createContext();

export const MyAppProvider = ({ children }) => {
  const [myAuth, setMyAuth] = useState(null);
  const [registerMsg, setRegisterMsg] = useState(null);
  const [loginMsg, setLoginMsg] = useState(null);
  const [logoutMsg, setLogoutMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchingData = async () => {
    setLoading(true);
    try {
     axios
        .get("http://localhost:4100/users", { withCredentials: true })
        .then((res) => setMyAuth(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <myContext.Provider
      value={{
        myAuth,
        loading,
        registerMsg,
        setRegisterMsg,
        // loginMsg,
        // setLoginMsg,
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

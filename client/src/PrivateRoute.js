import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { MyGlobalPropsProvider } from "./context";

export const PrivateRoute = ({ children }) => {
  const { myAuth } = MyGlobalPropsProvider();
  console.log(myAuth);

  return myAuth ? children : <Navigate to="/login" replace={true} />;
};

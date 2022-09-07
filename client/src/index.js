import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MyAppProvider } from "./context";
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyAppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyAppProvider>
  </React.StrictMode>
);

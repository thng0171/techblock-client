import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import { AdminContextProvider, useAdminContext } from "./context/AdminContext";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminContextProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

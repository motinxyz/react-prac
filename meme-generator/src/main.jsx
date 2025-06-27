import React from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

React.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

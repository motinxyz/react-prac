import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./styles/index.css";
import "./styles/variables.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

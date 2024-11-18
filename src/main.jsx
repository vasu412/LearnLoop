import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LearnLoopAuth from "./Pages/Auth.jsx";
import Home from "./Pages/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LearnLoopAuth />
    {/* <Home /> */}
  </StrictMode>
);

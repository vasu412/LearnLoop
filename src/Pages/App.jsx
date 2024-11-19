import React, { useState } from "react";
import Home from "./Home";
import context from "../Context/context";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <context.Provider value={{ darkMode, setDarkMode }}>
      <Home />
    </context.Provider>
  );
};

export default App;

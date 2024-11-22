import React, { useState } from "react";
import Home from "./Home";
import context from "../Context/context";
import { Provider } from "react-redux";
import store from "../Context/store";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Provider store={store}>
      <context.Provider value={{ darkMode, setDarkMode }}>
        <Home />
      </context.Provider>
    </Provider>
  );
};

export default App;

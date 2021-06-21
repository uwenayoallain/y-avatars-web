import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import { ThemeProvider } from "./utils/themeContext";
import App from "./App";
import "./css/tailwind.css";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

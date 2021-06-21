import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./utils/themeContext";
import App from "./App";
import "tailwindcss/dist/tailwind.css";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

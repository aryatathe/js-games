import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import "@fontsource/mali/latin-300.css";
import "@fontsource/mali/latin-400.css";
import "@fontsource/mali/latin-500.css";
import "@fontsource/mali/latin-600.css";
import "@fontsource/mali/latin-700.css";

createRoot(document.getElementById("root")).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

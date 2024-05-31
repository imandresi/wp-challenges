import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./components/App.js";
import "./styles.scss";

const root = ReactDOM.createRoot(
    document.getElementById("contact-form-toolbar")
);

root.render(<App/>);


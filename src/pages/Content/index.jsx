import React from "react";
import ReactDOM from "react-dom/client";
import Popup from './Popup'

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);
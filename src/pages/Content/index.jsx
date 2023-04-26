import React from "react";
import ReactDOM from "react-dom/client";
import Popup from './Popup'
var { Readability, isProbablyReaderable } = require('@mozilla/readability');

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

document.body.appendChild(rootElement);

if (isProbablyReaderable(document)) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Popup />
        </React.StrictMode>
    );
    var documentClone = document.cloneNode(true);
    var article = new Readability(documentClone).parse();
    console.log(article.textContent)
    console.log('is readable')
} else {
    console.log('not readable')

}

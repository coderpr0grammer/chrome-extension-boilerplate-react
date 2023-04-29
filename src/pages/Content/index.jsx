import React from "react";
import ReactDOM from "react-dom/client";
import Popup from './Popup'
var { Readability, isProbablyReaderable } = require('@mozilla/readability');
import Mark from "mark.js";

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
    var instance = new Mark(document);

    // instance.mark("TA43 was still in commission and available to fight, although she saw little action.[27]", { "accuracy": "complementary", "diacritics": true });


} else {
    console.log('not readable')

}

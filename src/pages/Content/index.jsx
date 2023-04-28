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
    // console.log(article.textContent)
    console.log('is readable')
    // Define the text to search for
    const searchText = "Bacteria are ubiquitous";

    // Get all the elements on the page
    const elements = document.querySelectorAll("*");

    // Loop through each element and check if it contains the search text
    let searchQuery = "Bacteria are ubiquitous";
    let textNodes = document.querySelectorAll("body *");

    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i];
        if (node.nodeType === Node.TEXT_NODE) {
            let searchText = node.textContent;
            if (searchText.indexOf(searchQuery) !== -1) {
                // Do something with the text node that contains the search query
                // node.style.backgroundColor = "yellow";
                console.log(node)
            }
        }
    }
} else {
    console.log('not readable')

}

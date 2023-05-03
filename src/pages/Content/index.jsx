import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Articles/Popup';
import Youtube from './Youtube/Youtube';
var { Readability, isProbablyReaderable } = require('@mozilla/readability');
// import Mark from 'mark.js';

const rootElement = document.createElement('div');
rootElement.id = 'react-chrome-app';

console.log(window.location)
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
  console.log(article);
  let segments = article.textContent.split('\n');
  segments.forEach((item, index) => {
    console.log('length: ', item.length);
  });
  // console.log(article.content.split('\n'));
  console.log('is readable');
  // var instance = new Mark(document);

  // instance.mark("TA43 was still in commission and available to fight, although she saw little action.[27]", { "accuracy": "complementary", "diacritics": true });
} else {
  console.log('not readable');
}


if (window.location.hostname === "www.youtube.com" && window.location.pathname === "/watch") {
  console.log('on youtube')
  const div = document.createElement('div');
  div.id = 'my-extension-root';
  const secondary = document.querySelector("#secondary");
  div.classList.remove('hidden')
  div.style.display = "block"


  secondary.insertBefore(div, secondary.firstChild);

  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <Youtube />
    </React.StrictMode>
  );
  // you are on a YouTube video page
} else {
  console.log('not on youtube')
  // you are not on a YouTube video page
}
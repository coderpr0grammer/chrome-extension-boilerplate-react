import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Articles/Popup';
import Youtube from './Youtube/Youtube';
// import { YoutubeTranscript } from 'youtube-transcript';
// import { YoutubeTranscript } from 'youtube-transcript';
var { Readability, isProbablyReaderable } = require('@mozilla/readability');

// import Mark from 'mark.js';

const rootElement = document.createElement('div');
rootElement.id = 'react-chrome-app';

console.log(window.location);
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

if (
  window.location.hostname === 'www.youtube.com' &&
  window.location.pathname === '/watch'
) {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Look for the #secondary div
        const secondary = document.getElementById('secondary');
        if (secondary) {
          // The #secondary div is now available, inject your content script
          const div = document.createElement('div');
          div.id = 'my-extension-root';
          div.classList.remove('hidden');
          div.style.display = 'block';

          secondary.insertBefore(div, secondary.firstChild);

          const root = ReactDOM.createRoot(div);
          root.render(
            <React.StrictMode>
              <Youtube />
            </React.StrictMode>
          );

          // Stop observing mutations after the first injection
          observer.disconnect();
          break;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // YoutubeTranscript.fetchTranscript('jvGnw1sHh9M').then(console.log);
} else {
  console.log('not on youtube');
  // you are not on a YouTube video page
}

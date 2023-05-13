import React, { useState, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Articles/Popup';
import Youtube from './Youtube/Youtube';
// import { YoutubeTranscript } from 'youtube-transcript';
// import { YoutubeTranscript } from 'youtube-transcript';
// import { GoogleOAuthProvider } from '@react-oauth/google';
var { Readability, isProbablyReaderable } = require('@mozilla/readability');

// import Mark from 'mark.js';

const rootElement = document.createElement('div');
rootElement.id = 'react-chrome-app';

console.log(window.location);
document.body.appendChild(rootElement);

export const ColorThemeContext = createContext();

const ColorThemeContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDarkMode = document.documentElement.getAttribute('dark') === 'true';

    if (isDarkMode) {
      // YouTube is in dark mode
      setDark(true);
      console.log('YouTube is in dark mode');
    } else {
      // YouTube is in light
      setDark(false);
      console.log('YouTube is in light mode');
    }
  }, []);

  return (
    <ColorThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

window.addEventListener('popstate', function (e) {
  alert(e.state);
  console.log('changed url', e.state);
});

window.addEventListener('locationchange', function () {
  console.log('location changed!');
});

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
              <ColorThemeContextProvider>
                {/* <GoogleOAuthProvider clientId="79132329678-16f3go9ciuch6erd9575rqnpr1rsqo7r.apps.googleusercontent.com"> */}
                <Youtube />
                {/* </GoogleOAuthProvider> */}
              </ColorThemeContextProvider>
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
} else {
  console.log('not on youtube');
  // you are not on a YouTube video page
}

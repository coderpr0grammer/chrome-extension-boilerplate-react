import React, { useState, useRef } from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import './Youtube.css';
// import { Button } from 'react-bootstrap';
// import image from '../../assets/img/icon-128.png';
// import ResultComponent from './ResultComponent';
import Searchbar from './Searchbar';
import Mark from 'mark.js';
import ResultComponent from './ResultComponent';
import './Searchbar.css';
import LoadingIcon from './LoadingIcon.js';

const Youtube = () => {
  const [results, setResults] = useState([]);
  const [extensionActive, setExtensionActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const extensionContainerRef = useRef(null);

  const handleButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'seekTo', time: 30 });
    });
  };

  //   if (
  //     window.matchMedia &&
  //     window.matchMedia('(prefers-color-scheme: dark)').matches
  //   ) {
  //     // The user has requested a dark color scheme
  //     setDark(true);
  //     console.log('Dark mode enabled');
  //   } else {
  //     // The user has requested a light color scheme
  //     setDark(false);

  //     console.log('Light mode enabled');
  //   }

  return (
    <div
      id="main-popup-skm"
      style={{
        top: 50,
        right: 50,
        zIndex: 999999,
        width: '100%',
      }}
      ref={extensionContainerRef}
    >
      <Searchbar
        loading={loading}
        onSubmit={(query) => {
          setLoading(true);
          setShowResults(false);
          // var instance = new Mark(document);

          // const options = {
          //   accuracy: "exactly",
          //   diacritics: true,
          //   wildcards: {
          //     enabled: true,
          //     key: tag => tag.matches("a, span") // Match text within <a> and <span> tags
          //   },
          //   separateWordSearch: false
          // };

          // instance.mark(query, options);
          function windowFind(str) {
            if ('find' in window) {
              return window.find(str, false, false, true);
            } else {
              return (
                document.getElementsByTagName('body').innerHTML.indexOf(str) >
                -1
              );
            }
          }

          setResults([1, 2, 3]);
          console.log(windowFind(query));

          setTimeout(() => {
            setShowResults(true);

            setLoading(false);
          }, 3000);
        }}
      />

      {results.map((item, index) => (
        <ResultComponent
          key={index}
          style={{ transitionDelay: `${(index + 1) * 0.2}s` }}
          className={`${showResults ? 'show' : ''}`}
        />
      ))}
    </div>
  );
};

export default Youtube;

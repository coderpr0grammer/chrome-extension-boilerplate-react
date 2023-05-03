import React, { useState, useRef } from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
// import { Button } from 'react-bootstrap';
// import image from '../../assets/img/icon-128.png';
// import ResultComponent from './ResultComponent';
import Searchbar from './Searchbar';
import Mark from 'mark.js';
import ResultComponent from './ResultComponent';
import './Searchbar.css'
import LoadingIcon from './LoadingIcon.js';

const Popup = () => {
  const [results, setResults] = useState([]);
  const [extensionActive, setExtensionActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const extensionContainerRef = useRef(null);


  const handleButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'seekTo', time: 30 });
    });
  };

  return (
    <div
      id="main-popup-skm"
      style={{
        position: 'fixed',
        top: 50,
        right: 50,
        zIndex: 999999,
        width: 300,
        transform: 'translate(300px, 0)',
      }}
      ref={extensionContainerRef}
    >
      <Searchbar
        loading={loading}
        onSubmit={(query) => {
          setLoading(true);
          setShowResults(false)
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
            setShowResults(true)

            setLoading(false)


          }, 3000);


        }}
        active={extensionActive}
        onToggleActive={() => {
          setExtensionActive(!extensionActive);
          if (extensionActive) {
            extensionContainerRef.current.style.transition =
              'transform 1s cubic-bezier(.3,1.29,.99,1.06)';
            extensionContainerRef.current.style.transform =
              'translate(300px, 0)';
          } else {
            extensionContainerRef.current.style.transition =
              'transform 1s cubic-bezier(.3,1.29,.99,1.06)';
            extensionContainerRef.current.style.transform =
              'translate(0px, 0px)';
          }
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

export default Popup;

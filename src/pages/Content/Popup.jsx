import React, { useState } from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
// import { Button } from 'react-bootstrap';
// import image from '../../assets/img/icon-128.png';
// import ResultComponent from './ResultComponent';
import Searchbar from './Searchbar';
import Mark from "mark.js";


const Popup = () => {
  const [results, setResults] = useState([1, 2, 3, 4, 5, 6]);
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
      }}
    >
      <Searchbar onSubmit={(query) => {

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
          if ("find" in window) {
            return window.find(str, false, false, true);
          } else {
            return document.getElementsByTagName("body").innerHTML.indexOf(str) > -1;
          }
        }

        console.log(windowFind(query))

      }} />
    </div>
  );
};

export default Popup;

import React, { useState, useRef, useEffect } from 'react';
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
  const [globalQuery, setGlobalQuery] = useState;
  const extensionContainerRef = useRef(null);

  const handleButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'seekTo', time: 30 });
    });
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // The user has requested a dark color scheme
      setDark(true);
      console.log('Dark mode enabled');
    } else {
      // The user has requested a light color scheme
      setDark(false);

      console.log('Light mode enabled');
    }
  }, []);

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
          setGlobalQuery(query);
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
          // function windowFind(str) {
          //   if ('find' in window) {
          //     return window.find(str, false, false, true);
          //   } else {
          //     return (
          //       document.getElementsByTagName('body').innerHTML.indexOf(str) >
          //       -1
          //     );
          //   }
          // }

          var url = window.location.href;
          console.log('url: ', url);

          let parts = url.split('v=');
          let thepart = parts[1].split('&t=');

          var videoId = thepart[0].split('&ab_channel')[0];

          let json = { youtube_url: url, query: query };

          fetch(
            'https://pacific-woodland-70260.herokuapp.com/process_youtube_url',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(json),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data == 'TranscriptError') {
                alert('Subtitles not avaiable or video is restricted');
              } else if (data == 'LengthError') {
                alert(
                  'For our beta version, videos cannot be more than 3 hours'
                );
              } else if (data == 'ApiError') {
                alert('Invalid request');
              } else {
                console.log(data.results.matches);
                setResults(data.results.matches);
                console.log(data);
              }
            })
            .catch(function (error) {
              alert(error);
            });

          // console.log(windowFind(query));

          setLoading(false);
          setTimeout(() => setShowResults(true), 500);
        }}
      />

      {results &&
        results.map((item, index) => (
          <ResultComponent
            content={item.metadata.text}
            timeStampURL={item.metadata.url}
            key={index}
            dark={dark}
            query={globalQuery}
            style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            className={`${showResults ? 'show' : ''}`}
          />
        ))}
    </div>
  );
};

export default Youtube;

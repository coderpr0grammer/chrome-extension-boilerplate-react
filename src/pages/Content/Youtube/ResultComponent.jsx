import React, { useEffect, useRef, useContext } from 'react';
import './ResultComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ColorThemeContext } from '..';

const ResultComponent = (props) => {
  const { dark } = useContext(ColorThemeContext);
  console.log(props.dark);

  const player = useRef(null);

  function extractTimeFromYoutubeUrl(url) {
    const regex = /[?&]t=(\d+)/;
    const match = url.match(regex);
    if (match) {
      const timeInSeconds = parseInt(match[1]);
      return timeInSeconds;
    }
    return null;
  }

  const boldenWordInString = (words, paragraph) => {
    let output = '';
    paragraph.split(' ').map((word) => {
      let match = false;
      // console.log(word)
      words.forEach((wordQuery) => {
        // console.log(wordQuery)
        if (word.toLowerCase() == wordQuery.toLowerCase()) {
          output += `<strong>${word}</strong> `;
          match = true;
        }
      });
      if (match == false) {
        output += word + ' ';
      }
    });
    return output;
  };

  useEffect(() => {
    const video = document.querySelector('video');

    if (video) {
      // do something with the video element
      console.log('Video element found:', video);
      player.current = video;
    } else {
      console.error('VIDEO ELEMENT NOT FOUND');
    }
  }, []);

  // useEffect(() => {
  //   const handleVideoLoad = () => {
  //     // console.log((document.querySelector('video').currentTime = 30));
  //     const video = document.querySelector('video');
  //     if (video) {
  //       // do something with the video element
  //       console.log('Video element found:', video);
  //       player.current = video;
  //     }
  //   };

  //   // create a new MutationObserver
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       // check if a new node has been added
  //       if (mutation.addedNodes.length) {
  //         // check if the added node is a video element
  //         const video = mutation.target.querySelector('video');
  //         if (video) {
  //           // stop observing changes and call handleVideoLoad
  //           observer.disconnect();
  //           handleVideoLoad();
  //         }
  //       }
  //     });
  //   });

  //   // start observing changes to the body element
  //   observer.observe(document.body, { childList: true, subtree: true });
  // }, []);

  const handleButtonClick = () => {
    let seconds = extractTimeFromYoutubeUrl(props.timeStampURL);

    console.log((player.current.currentTime = seconds));
  };

  return (
    <div
      style={{
        width: '100%',
        background: 'transparent',
        minHeight: 100,
        borderRadius: 10,
        boxSizing: 'border-box',
        padding: 15,
        ...props.style,
      }}
      className={`responseComponent ${props.className}`}
      onClick={handleButtonClick}
    >
      <div style={{ display: 'inline' }}>
        <div className={`playButton ${dark ? 'dark' : 'light'}`}>
          <FontAwesomeIcon
            icon={faPlay}
            style={{
              color: 'inherit',
              width: 8,
              height: 8,
            }}
          />
        </div>
        <p style={{ color: dark ? 'white' : 'black', display: 'inline' }}>
          {props.content}
        </p>
      </div>
    </div>
  );
};

export default ResultComponent;

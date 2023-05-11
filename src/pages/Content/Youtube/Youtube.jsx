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
import { GoogleLogin } from '@react-oauth/google';

const Youtube = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [extensionActive, setExtensionActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const extensionContainerRef = useRef(null);
  const errorContainer = useRef(null);

  // const divRef = useRef(null);

  // useEffect(() => {
  //   if (divRef.current) {
  //     console.log(window.google)
  //     window.google.accounts.id.initialize({
  //       client_id: '79132329678-6gdji4k1kjtm14e12tjng48p55m767se.apps.googleusercontent.com',
  //       callback: (res, error) => {
  //         // This is the function that will be executed once the authentication with google is finished
  //       },
  //     });
  //     window.google.accounts.id.renderButton(divRef.current, {
  //       theme: 'filled_blue',
  //       size: 'medium',
  //       type: 'standard',
  //       text: 'continue_with',
  //     });
  //   }
  // }, [divRef.current]);

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
      extensionContainerRef.current.style.color = 'white';
      console.log('Dark mode enabled');
    } else {
      // The user has requested a light color scheme
      setDark(false);
      extensionContainerRef.current.style.color = 'black';

      console.log('Light mode enabled');
    }
  }, []);

  function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }

  // useEffect(() => {
  //   if (google) {
  //     if (google.accounts) {
  //       google.accounts.id.initialize({
  //         client_id: "79132329678-16f3go9ciuch6erd9575rqnpr1rsqo7r.apps.googleusercontent.com",
  //         callback: handleCredentialResponse
  //       });
  //       google.accounts.id.renderButton(
  //         document.getElementById("buttonDiv"),
  //         { theme: "outline", size: "large" }  // customization attributes
  //       );
  //       google.accounts.id.prompt(); // also display the One Tap dialog
  //     }

  //   }

  // }, [google])

  useEffect(() => {
    setTimeout(() => {
      errorContainer.current.style.opacity = 1;
    }, 0);
  }, [error]);

  return (
    <div
      id="main-popup-skm"
      style={{
        top: 50,
        right: 50,
        width: '100%',
      }}
      ref={extensionContainerRef}
    >
      {/* <div id="buttonDiv"></div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }} />
      <div id="g_id_onload"
        data-client_id="79132329678-16f3go9ciuch6erd9575rqnpr1rsqo7r.apps.googleusercontent.com"
        data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-callback="OnSuccess"
        data-logo_alignment="left">
      </div> */}
      {/* <div ref={divRef} /> */}
      <Searchbar
        loading={loading}
        onSubmit={(query) => {
          setError('');
          setGlobalQuery(query);
          setLoading(true);
          setShowResults(false);

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
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  'Network response was not ok. Internal server error!'
                );
              }
              return response.json();
            })
            .then((data) => {
              if (data == 'TranscriptError') {
                setError('Subtitles not avaiable or video is restricted');
              } else if (data == 'LengthError') {
                setError(
                  "Unfortunately for our Beta release we can't Skm videos cannot be longer than 2 hours"
                );
                console.log(error);
              } else if (data == 'ApiError') {
                setError(
                  'We had trouble processing this video. Please try again.'
                );
              } else {
                setResults(data.results.matches);
                setTimeout(() => {
                  setLoading(false);

                  setShowResults(true);
                }, 300);
              }

              setLoading(false);
            })
            .catch(function (error) {
              setLoading(false);
              console.log('error message: ' + error);
              setError(error);
              console.log('error: ', error);
              setError(
                "We're currently experiencing issues with our servers. We apologize for the incovenience, please try later!"
              );
            });

          // console.log(windowFind(query));
        }}
      />

      {!error &&
        results &&
        results.map((item, index) => (
          <ResultComponent
            content={item.metadata.text}
            timeStampURL={item.metadata.url}
            query={globalQuery}
            key={index}
            dark={dark}
            style={{ transitionDelay: `${(index + 1) * 0.06}s` }}
            className={`${showResults ? 'show' : ''}`}
          />
        ))}
      {error && (
        <div
          className="errorContainer"
          style={{ transition: 'opacity 2s ease-in-out' }}
          ref={errorContainer}
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Youtube;

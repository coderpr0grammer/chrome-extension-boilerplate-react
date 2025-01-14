import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Button } from 'react-bootstrap';
import image from '../../assets/img/icon-128.png';
import ResultComponent from './ResultComponent';
import Searchbar from './Searchbar';

const Popup = () => {
  const [results, setResults] = useState([1, 2, 3, 4, 5, 6]);
  const handleButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'seekTo', time: 30 });
    });
  };
  return (
    <div
      className="App"
      style={{
        border: 'solid 8px',
        borderRadius: 25,
        borderWidth: 8,
        background: '#282c34',
        borderImage:
          'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%) 1',
      }}
    >
      <button onClick={handleButtonClick}>Go to 30 seconds</button>
      <h1
        style={{
          fontFamily: "monospace, 'Expletus Sans', Roboto",
          background:
            'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 0,
          fontWeight: 800,
        }}
      >
        {'{ Skm }'}
      </h1>
      <h5
        style={{
          fontFamily: "monospace, 'Expletus Sans', Roboto",
          background:
            'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        multimodal <strong style={{ textDecoration: 'underline' }}>ai</strong>{' '}
        ctrl+f
      </h5>

      <Searchbar onSubmit={(inputText) => alert(inputText)} />

      <div
        className="results"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflowY: 'scroll',
          height: '100%',
          marginBottom: 50,
          paddingBottom: 120,
          borderRadius: 10,
          marginTop: 20,
          paddingRight: 5,
        }}
      >
        {results.map((item, index) => (
          <ResultComponent key={index} />
        ))}
      </div>
    </div>
  );
};

export default Popup;

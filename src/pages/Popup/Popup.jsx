import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Button } from 'react-bootstrap';
import image from '../../assets/img/icon-128.png';
import Searchbar from './Searchbar';

const Popup = () => {
  return (
    <div
      className="App"
      style={{
        border: 'solid 10px',
        borderRadius: 25,
        borderWidth: 10,
        background: '#282c34',
        borderImage:
          'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%) 1',
      }}
    >
      <h1
        style={{
          fontFamily: "'Expletus Sans', Roboto",
          background: 'linear-gradient(#eee, #333)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Skm
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Searchbar />
      </div>
    </div>
  );
};

export default Popup;

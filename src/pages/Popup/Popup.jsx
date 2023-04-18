import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Button } from 'react-bootstrap';
import image from '../../assets/img/icon-128.png';

const Popup = () => {
  return (
    <div className="App" style={{
      background: 'black', borderWidth: 10, border: 'solid 10px',
      borderImage: 'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%) 1',
    }}>
      <h1 style={{ lineHeight: 1, marginTop: 10, marginBottom: 0, position: 'fixed' }}>Skm.ai 🤖</h1>

    </div>
  );
};

export default Popup;

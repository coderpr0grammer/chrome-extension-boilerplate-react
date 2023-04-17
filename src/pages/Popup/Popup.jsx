import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Button } from 'react-bootstrap';
import image from '../../assets/img/icon-128.png'

const Popup = () => {
  return (
    <div className="App" style={{ flex: 1, width: '100%', height: '100%' }}>
      <h1 style={{ lineHeight: 1, marginTop: 10, marginBottom: 0 }}>Ctrl+F on steroids</h1>
      <h4 style={{ marginTop: 5 }}>powered by ai 🤖</h4>
      <img src={image} width="300px"></img>
      <Button variant="primary">Helo</Button>
    </div>
  );
};

export default Popup;

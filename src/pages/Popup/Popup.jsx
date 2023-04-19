import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Button } from 'react-bootstrap';
import image from '../../assets/img/icon-128.png';
import ResultComponent from './ResultComponent';
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
        borderImage: 'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%) 1'
      }}
    >

      <h1
        style={{
          fontFamily: "monospace, 'Expletus Sans', Roboto",
          background: 'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 0,
          fontWeight: 800,
        }}
      >
        {'{ Skm }'}
        <br></br>
      </h1>
      <h5 style={{
        fontFamily: "monospace, 'Expletus Sans', Roboto",
        background: 'linear-gradient(to bottom right, #FF914D 0%, #F67B30 50%, #EF2E2E 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>multimodal <strong style={{ textDecoration: 'underline' }}>ai</strong>  ctrl+f</h5>


      <Searchbar onSubmit={(inputText) => alert(inputText)} />

      <div className="results" style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', overflowY: 'scroll', height: '100%', marginTop: 20, marginBottom: 50, paddingTop: 20, paddingBottom: 20, borderRadius: 10 }}>
        <ResultComponent />
        <ResultComponent />
        <ResultComponent />
        <ResultComponent />

        <ResultComponent />
        <ResultComponent />
        <ResultComponent />



      </div>


    </div >
  );
};

export default Popup;

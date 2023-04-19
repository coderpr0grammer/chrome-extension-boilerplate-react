import React, { useState, useRef } from 'react';
import './Searchbar.css';

const Searchbar = (props) => {
  const onChangeText = (e) => {
    console.log(inputRef.current.scrollHeight);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height =
      (inputRef.current.scrollHeight - 42) % 16 == 0
        ? inputRef.current.scrollHeight - 16 + 'px'
        : inputRef.current.scrollHeight + 'px';
  };

  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  return (
    <>
      <textarea
        name="text"
        id="text"
        type="text"
        ref={inputRef}
        style={{
          width: '100%',
          height: 40,
          resize: 'none',
          fontSize: 16,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 20,
          border: 'none',
          outline: 'none',
          padding: 5,
          paddingLeft: 10,
          boxShadow: 'rgba(0,0,0,0.5) 0px 0px 20px 0px',
        }}
        onChange={onChangeText}
      />
    </>
  );
};

export default Searchbar;

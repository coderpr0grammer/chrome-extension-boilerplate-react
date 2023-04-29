import React, { useState, useRef, useEffect } from 'react';
import './Searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Searchbar = (props) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [extensionActive, setExtensionActive] = useState(false);

  const [textareaHeight, setTextareaHeight] = useState('auto');

  const onChangeText = (e) => {
    setInputText(e.target.value);
    console.log('scrollheight', inputRef.current.scrollHeight);
    // inputRef.current.style.height = 'auto';
    // if (e.target.value == '') {
    //   setTextareaHeight('auto');
    // } else {
    //   setTextareaHeight(inputRef.current.scrollHeight);
    // }

    console.log('height', inputRef.current.style.height);
    inputRef.current.style.height = inputRef.current.scrollHeight;
    setTextareaHeight('auto')
    setTextareaHeight(inputRef.current.scrollHeight)

  };

  useEffect(() => {
    inputRef.current.style.border = 'none';
    inputRef.current.style.borderWidth = '0';
    inputRef.current.style.fontFamily =
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  }, []);

  const handle = () => console.log('Enter pressed');

  return (
    <>
      <div
        style={{
          width: '100%',
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'row',
          background: 'white',
          borderRadius: 20,
          border: 'none',
          position: 'relative',
          zIndex: 999999,
          boxShadow: 'rgba(0,0,0,0.5) 0px 0px 20px 0px',
          transform: 'translate(300px, 0)',
        }}
        ref={containerRef}
        className="searchbar"
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.3)',
            width: '100%',
            maxWidth: 300,
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 20,
            border: 'none',
            position: 'relative',
            zIndex: 999999,
            boxShadow: 'rgba(0,0,0,0.5) 0px 0px 20px 0px',
          }}
        >
          <button
            style={{
              background: 'transparent',
              padding: 0,
              border: 'none',
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              outline: 'none',
              justifyContent: 'center',
              width: extensionActive ? 'auto' : 60,
            }}
            onClick={() => {
              if (extensionActive) {
                containerRef.current.style.transition =
                  'transform 1s cubic-bezier(.3,1.29,.99,1.06)';
                containerRef.current.style.transform = 'translate(300px, 0)';
              } else {
                inputRef.current.focus()
                containerRef.current.style.transition =
                  'transform 1s cubic-bezier(.3,1.29,.99,1.06)';
                containerRef.current.style.transform = 'translate(0px, 0px)';
              }

              setExtensionActive(!extensionActive);
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={extensionActive ? 10 : 20}
              style={{
                width: 20,
                height: 20,
                color: extensionActive
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(255, 255, 255, 0.8)',
                justifySelf: 'center',
                marginLeft: extensionActive ? 12 : 10,
                marginTop: extensionActive ? 13 : 12,
                transition: '0.5s',
              }}
            />
          </button>
          <textarea
            name="text"
            id="text"
            type="text"
            ref={inputRef}
            rows="1"
            autoFocus
            style={{
              width: '100%',
              height: textareaHeight,
              resize: 'none',
              maxHeight: 200,
              overflowY: 'auto',
              padding: 10,
              fontSize: 16,
              background: 'transparent',
              borderRadius: 20,
              border: '0px none !important',
              outline: 'none',
              transition: '0.1s',
              color: 'white',
            }}
            placeholder="Skim this page"
            value={inputText}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key == 'Enter') {
                e.preventDefault();
                props.onSubmit(inputText);
              } else if (e.key === 'Backspace') {
                setTextareaHeight('auto');
              }
            }}
            onFocus={() =>
            (containerRef.current.style.boxShadow =
              'rgba(0,0,0,0.5) 0px 0px 20px 0px')
            }
            onBlur={() => {
              // containerRef.current.style.boxShadow = "rgba(0,0,0,0.0) 0px 0px 20px 0px"
            }}
            onChange={onChangeText}
          />
        </div>
      </div>
    </>
  );
};

export default Searchbar;

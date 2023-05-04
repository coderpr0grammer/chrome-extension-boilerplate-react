import React, { useState, useRef, useEffect } from 'react';
import './Searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LoadingIcon from './LoadingIcon';

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
    if (e.target.value == '') {
      setTextareaHeight('auto');
    } else {
      setTextareaHeight(inputRef.current.scrollHeight);
    }
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
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: 'white',
          borderRadius: 20,
          border: 'none',
          position: 'relative',
          zIndex: 999999,
          boxShadow: 'rgba(0,0,0,0.5) 0px 0px 20px 0px',
          marginBottom: 20,
        }}
        ref={containerRef}
        className="searchbar"
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.3)',
            width: '100%',
            maxWidth: '100%',
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
              // cursor: 'pointer',
              outline: 'none',
              justifyContent: 'center',
              width: props.active ? 35 : 60,
            }}
            // onClick={() => {
            //   if (!props.active) {
            //     inputRef.current.focus();
            //   }
            //   props.onToggleActive();
            // }}
          >
            {props.loading ? (
              <div style={{ marginLeft: 5, marginTop: 3 }}>
                <LoadingIcon />
              </div>
            ) : (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={props.active ? 20 : 20}
                style={{
                  width: props.active ? 20 : 20,
                  height: props.active ? 20 : 20,
                  color: props.active
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(255, 255, 255, 0.8)',
                  justifySelf: 'center',
                  marginLeft: props.active ? 12 : 5,
                  marginTop: props.active ? 13 : 12,
                  transition: '1s',
                }}
              />
            )}
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
              paddingLeft: 5,
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

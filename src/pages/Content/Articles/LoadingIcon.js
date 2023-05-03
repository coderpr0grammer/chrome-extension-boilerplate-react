import React from 'react';

const LoadingIcon = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 0, background: 'transparent', display: 'block', height: 40, }} width="50px" height="50px" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="25" stroke="transparent" stroke-width="10" fill="none"></circle>
        <circle cx="50" cy="50" r="25" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1"></animateTransform>
          <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="1s" values="15.707963267948967 141.3716694115407;78.53981633974483 78.53981633974483;15.707963267948967 141.3716694115407" keyTimes="0;0.5;1"></animate>
        </circle>
      </svg>
    </>
  );
}

export default LoadingIcon;

import React from 'react';
import './ResultComponent.css';

const ResultComponent = () => {
  return (
    <div
      style={{
        width: '100%',
        background: '#F8F9F9',
        minHeight: 100,
        borderRadius: 10,
      }}
      className="responseComponent"
    >
      <div className="text1 text-skeleton"></div>
      <div className="text2 text-skeleton"></div>
      <div className="text3 text-skeleton"></div>
    </div>
  );
};

export default ResultComponent;
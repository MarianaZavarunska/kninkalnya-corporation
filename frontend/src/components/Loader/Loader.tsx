import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loader;

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="custom-loader">
      <div className="wave-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
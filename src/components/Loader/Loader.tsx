import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className="loader-wrap" data-cy="loader">
    <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </div>
);

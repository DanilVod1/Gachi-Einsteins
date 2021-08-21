import React from 'react';
import './CardComponents.scss';
const CardComponents = ({ children }) => {
  return <div className="card-component">{children}</div>;
};

export default CardComponents;

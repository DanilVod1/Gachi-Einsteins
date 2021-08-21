import React from 'react';
import './PrototypeViewsGroup.scss';
const PrototypeViewsGroup = ({ name, children }) => {
  return (
    <div className="prototype-views-group">
      <div className="name">{name}</div>
      <div className="proptype-views-group-items">{children}</div>
    </div>
  );
};

export default PrototypeViewsGroup;

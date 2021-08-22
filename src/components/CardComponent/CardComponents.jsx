import React from 'react';
import './CardComponents.scss';
const CardComponents = ({
  children,
  elementName,
  elementStyle,
  elementIsCheked,
}) => {
  return <div className="card-component">{children}</div>;
};

export default CardComponents;

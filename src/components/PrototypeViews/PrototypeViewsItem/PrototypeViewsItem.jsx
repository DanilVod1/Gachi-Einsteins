import React from 'react';
import './PrototypeViewsItem.scss';
import { changeCanvasSize } from '../../../store/actions/action';
import { useDispatch } from 'react-redux';

const PrototypeViewsItem = ({
  width,
  widthColumns,
  countColumns,
  spaceBetweenColumns,
  indentField,
  children,
}) => {
  const dispatch = useDispatch();

  const selectCanvas = (
    width,
    widthColumns,
    countColumns,
    spaceBetweenColumns,
    indentField
  ) => {
    console.log(
      width,
      width,
      widthColumns,
      countColumns,
      spaceBetweenColumns,
      indentField
    );
    dispatch(
      changeCanvasSize({
        width,
        height: width,
        widthColumns,
        countColumns,
        spaceBetweenColumns,
        indentField,
      })
    );
  };
  return (
    <div
      className="prototype-views-item"
      onClick={() =>
        selectCanvas(
          width,
          widthColumns,
          countColumns,
          spaceBetweenColumns,
          indentField
        )
      }
    >
      {children}
    </div>
  );
};

export default PrototypeViewsItem;

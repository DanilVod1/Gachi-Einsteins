import React, { useEffect, useRef } from 'react';
import './EditContainer.scss';
import { ThemeProvider } from '@design-system-rt/rtk-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import ScrollZoom from './utils/zoomContainer';
import { Resizable } from 're-resizable';
import { changeCanvasSize, setRef } from '../../store/actions/action';

const EditContainer = () => {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const wrapRef = useRef(null);
  let scroll = null;

  const [canvasHeight, setCanvasHeight] = React.useState(state.height);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.right-slide').onwheel = (e) =>
        e.preventDefault();
      const editContainer = document.querySelector('.edit-container');
      editContainer.onwheel = (e) => e.preventDefault();
      scroll = new ScrollZoom(
        document.querySelector('#wrapper'),
        5,
        0.05,
        state.width,
        canvasHeight
      );
    }, 0);
  }, []);

  useEffect(() => {
    dispatch(
      changeCanvasSize({
        width: state.width,
        height: canvasHeight,
        widthColumns: state.widthColumns,
        countColumns: state.countColumns,
        spaceBetweenColumns: state.spaceBetweenColumns,
        indentField: state.indentField,
      })
    );
  }, [canvasHeight]);

  useEffect(() => {
    setCanvasHeight(state.height);
    scroll = ScrollZoom(
      document.querySelector('#wrapper'),
      5,
      0.1,
      state.width,
      state.height,
      scroll
    );
  }, [state.width, state.height]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setRef({ exportRef: wrapRef }));
    }, 0);
  }, [wrapRef]);

  const moveOnClick = (e) => {
    let parent = e.currentTarget;
    if (e.ctrlKey) {
      parent.onmousedown = function (e) {
        let fixClickY = e.clientY;
        let fixClickX = e.clientX;

        function moveAt(e) {
          let deltaY = fixClickY <= e.clientY ? 1 : -1;
          let deltaX = fixClickX <= e.clientX ? 1 : -1;

          parent.scrollTo({
            top: parent.scrollTop + deltaY,
            left: parent.scrollLeft + deltaX,
          });
        }
        document.onmousemove = function (e) {
          moveAt(e);
        };
        parent.onmouseup = function () {
          document.onmousemove = null;
          parent.onmouseup = null;
        };
      };
    }
  };

  const gridColumns = new Array(state.countColumns).fill('');

  let left = state.indentField;

  return (
    <ThemeProvider themeName={state.theme}>
      <div className="edit-container" onClick={moveOnClick}>
        <div id="wrapper" ref={wrapRef}>
          <Resizable
            id="container"
            style={{ transform: 'scale(1)', scale: 1 }}
            maxWidth={state.width}
            size={{ width: state.width, height: canvasHeight }}
            onResizeStop={(e, direction, ref, d) => {
              wrapRef.current.style.transition =
                'cubic-bezier(0.58, 0.6, 0.57, 0.6) 0.2s';
              ref.style.transition = 'cubic-bezier(0.58, 0.6, 0.57, 0.6) 0.2s';
              setCanvasHeight(canvasHeight + d.height);
              scroll = new ScrollZoom(
                document.querySelector('#wrapper'),
                5,
                0.1,
                state.width,
                state.height,
                scroll
              );
            }}
            onResizeStart={(e, direction, ref, d) => {
              wrapRef.current.style.transition = 'none';
              ref.style.transition = 'none';
            }}
          >
            <div className="editor" style={{ transform: 'none' }}>
              {gridColumns?.map((_, index) => {
                left +=
                  index === 0
                    ? 0
                    : state.widthColumns + state.spaceBetweenColumns;

                return (
                  <div
                    className="col"
                    style={{
                      width: state.widthColumns,
                      left: left,
                    }}
                  ></div>
                );
              })}
            </div>
          </Resizable>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditContainer;

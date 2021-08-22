import React, { useEffect, useRef } from 'react';
import Styled from 'styled-components';
import './EditContainer.scss';
import {
  ThemeProvider,
  Footer,
  Header,
  Container,
  Row,
  Col,
  Button,
} from '@design-system-rt/rtk-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import ScrollZoom from './utils/zoomContainer';
import { Resizable } from 're-resizable';
import {
  changeCanvasSize,
  changeRightTab,
  setRef,
} from '../../store/actions/action';

const EditContainer = () => {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const wrapRef = useRef(null);
  let scroll = null;

  const [canvasHeight, setCanvasHeight] = React.useState(state.height);

  const onResizeStop = (e, direction, ref, d) => {
    wrapRef.current.style.transition =
      'cubic-bezier(0.58, 0.6, 0.57, 0.6) 0.2s';
    ref.style.transition = 'cubic-bezier(0.58, 0.6, 0.57, 0.6) 0.2s';
    setCanvasHeight(canvasHeight + d.height);
  };

  const onResizeStart = (e, direction, ref, d) => {
    wrapRef.current.style.transition = 'none';
    ref.style.transition = 'none';
  };

  useEffect(() => {
    setTimeout(() => {
      const editContainer = document.querySelector('.edit-container');
      const appDom = document.querySelector('.App');
      editContainer.onwheel = (e) => e.preventDefault();
      scroll = new ScrollZoom(
        document.querySelector('#wrapper'),
        5,
        0.05,
        state.width,
        canvasHeight
      );
      appDom.onmousedown = function () {
        const cardComponents = document.querySelectorAll('[data-drag]');

        cardComponents.forEach((cardComponent) => {
          cardComponent.onmousedown = function (e) {
            let currentDroppable = null;
            dispatch(changeRightTab({ rightTab: '1' }));

            if (cardComponent) {
              let shiftX =
                e.clientX - cardComponent.getBoundingClientRect().left;
              let shiftY =
                e.clientY - cardComponent.getBoundingClientRect().top;

              cardComponent.style.position = 'absolute';
              cardComponent.style.zIndex = 1000;
              cardComponent.style.display = '';

              document.body.append(cardComponent);

              moveAt(e.pageX, e.pageY);

              function moveAt(pageX, pageY) {
                cardComponent.style.left = pageX - shiftX + 'px';
                cardComponent.style.top = pageY - shiftY + 'px';
              }

              function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);

                cardComponent.hidden = true;
                let elemBelow = document.elementFromPoint(
                  event.clientX,
                  event.clientY
                );
                cardComponent.hidden = false;

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.col');

                if (currentDroppable != droppableBelow) {
                  if (currentDroppable) {
                    // null если мы были не над droppable до этого события
                    // (например, над пустым пространством)
                    leaveDroppable(currentDroppable);
                  }
                  currentDroppable = droppableBelow;
                  if (currentDroppable) {
                    // null если мы не над droppable сейчас, во время этого события
                    // (например, только что покинули droppable)
                    enterDroppable(currentDroppable);
                  }
                }
              }

              document.addEventListener('mousemove', onMouseMove);

              cardComponent.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                cardComponent.onmouseup = null;
              };
            }
            function enterDroppable(elem) {
              elem.style.background = 'pink';
            }

            function leaveDroppable(elem) {
              elem.style.background = '';
            }
            if (cardComponent) {
              cardComponent.ondragstart = function () {
                return false;
              };
            }
          };
        });
      };
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
    if (state.width <= 375) {
      scroll = ScrollZoom(
        document.querySelector('#wrapper'),
        5,
        0.1,
        state.width,
        state.height,
        1
      );
    } else if (state.width > 375 && state.width <= 1024) {
      scroll = ScrollZoom(
        document.querySelector('#wrapper'),
        5,
        0.1,
        state.width,
        state.height,
        0.6
      );
    } else {
      scroll = ScrollZoom(
        document.querySelector('#wrapper'),
        5,
        0.1,
        state.width,
        state.height,
        0.3
      );
    }
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
            enable={{
              top: false,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            id="container"
            style={{ transform: 'scale(1)', scale: 1 }}
            maxWidth={state.width}
            size={{ width: state.width, height: canvasHeight }}
            scale={0.3}
            onResizeStop={onResizeStop}
            onResizeStart={onResizeStart}
          >
            <div
              className="editor"
              style={{
                transform: 'none',
                backgroundColor:
                  state.theme === 'dark'
                    ? 'rgb(16, 24, 40)'
                    : 'rgb(255, 255, 255)',
                height: '100%',
                width: '100%',
              }}
            >
              <Header></Header>
              <div
                style={{
                  marginLeft: '-20px',
                  marginRight: '-20px',
                  width: 'calc(100% + 40px)',
                  height: 'calc(100% - 64px - 40px)',
                }}
              >
                <Container noGapMobileS>
                  <Row></Row>
                </Container>
              </div>
              <Footer copyright='"© 2021 ПАО «Ростелеком». 0+"'></Footer>
            </div>
          </Resizable>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditContainer;

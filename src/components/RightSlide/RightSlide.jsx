import React, { useState, useRef, useEffect } from 'react';
import './RightSlide.scss';
import {
  Button,
  InputNumberStepper,
  RadioButton,
  RadioGroup,
  TabsClassicPanel,
  Typography,
  Select,
  CloudUpload,
  InputText,
} from '@design-system-rt/rtk-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from 'react-component-export-image';
import {
  changeCanvasSize,
  changeColorStyle as changeColorStyleAction,
  changeCornersStyle as changeCornersStyleAction,
  changeExportFormat as changeExportFormatAction,
  setLoaderStatus,
} from '../../store/actions/action';
import views from './data.js';
import PrototypeViewsGroup from '../PrototypeViews/PrototypeViewsGroup/PrototypeViewsGroup';
import PrototypeViewsItem from '../PrototypeViews/PrototypeViewsItem/PrototypeViewsItem';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

let fileReader;

export default function RightSlide() {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const changeExportFormat = (e) => {
    const exportFormat = e;
    dispatch(changeExportFormatAction({ exportFormat: exportFormat }));
  };

  const fileRef = useRef(null);
  const [fileI, setFileI] = useState({ value: '' });

  useEffect(() => {
    console.log(fileI);
    // add dispatch to upload builder tree
  }, [fileI]);

  const changeColorStyle = (e) => {
    const colorStyle = e;
    dispatch(changeColorStyleAction({ colorStyle: colorStyle }));
  };

  const changeCornersStyle = (e) => {
    const cornersStyle = e;
    dispatch(changeCornersStyleAction({ cornersStyle: cornersStyle }));
  };

  const Export = () => {
    console.log(state);
    if (state.exportRef) {
      state.exportRef.current.style.left = 0;
      state.exportRef.current.style.top = 0;
      state.exportRef.current.style.width =
        state.exportRef.current.firstElementChild.style.width;
      state.exportRef.current.style.height =
        state.exportRef.current.firstElementChild.style.height;
      state.exportRef.current.firstElementChild.style.transform = 'scale(1)';

      dispatch(setLoaderStatus({ isLoading: true }));

      setTimeout(() => {
        if (state.exportFormat === 'png') {
          exportComponentAsPNG(state.exportRef);
        } else if (state.exportFormat === 'jpeg') {
          exportComponentAsJPEG(state.exportRef);
        } else if (state.exportFormat === 'pdf') {
          exportComponentAsPDF(state.exportRef);
        } else if (state.exportFormat === 'html') {
          var pageHTML =
            `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <meta name="theme-color" content="#000000" />
              <title>RosDesigner</title>
            </head>
            <body>` +
            state.exportRef.current.outerHTML +
            `    <script>
            !(function (e) {
              function r(r) {
                for (
                  var n, l, f = r[0], i = r[1], a = r[2], p = 0, s = [];
                  p < f.length;
                  p++
                )
                  (l = f[p]),
                    Object.prototype.hasOwnProperty.call(o, l) &&
                      o[l] &&
                      s.push(o[l][0]),
                    (o[l] = 0);
                for (n in i)
                  Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
                for (c && c(r); s.length; ) s.shift()();
                return u.push.apply(u, a || []), t();
              }
              function t() {
                for (var e, r = 0; r < u.length; r++) {
                  for (var t = u[r], n = !0, f = 1; f < t.length; f++) {
                    var i = t[f];
                    0 !== o[i] && (n = !1);
                  }
                  n && (u.splice(r--, 1), (e = l((l.s = t[0]))));
                }
                return e;
              }
              var n = {},
                o = { 1: 0 },
                u = [];
              function l(r) {
                if (n[r]) return n[r].exports;
                var t = (n[r] = { i: r, l: !1, exports: {} });
                return e[r].call(t.exports, t, t.exports, l), (t.l = !0), t.exports;
              }
              (l.m = e),
                (l.c = n),
                (l.d = function (e, r, t) {
                  l.o(e, r) ||
                    Object.defineProperty(e, r, { enumerable: !0, get: t });
                }),
                (l.r = function (e) {
                  'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
                }),
                (l.t = function (e, r) {
                  if ((1 & r && (e = l(e)), 8 & r)) return e;
                  if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
                  var t = Object.create(null);
                  if (
                    (l.r(t),
                    Object.defineProperty(t, 'default', { enumerable: !0, value: e }),
                    2 & r && 'string' != typeof e)
                  )
                    for (var n in e)
                      l.d(
                        t,
                        n,
                        function (r) {
                          return e[r];
                        }.bind(null, n)
                      );
                  return t;
                }),
                (l.n = function (e) {
                  var r =
                    e && e.__esModule
                      ? function () {
                          return e.default;
                        }
                      : function () {
                          return e;
                        };
                  return l.d(r, 'a', r), r;
                }),
                (l.o = function (e, r) {
                  return Object.prototype.hasOwnProperty.call(e, r);
                }),
                (l.p = '/');
              var f = (this.webpackJsonprostelecom =
                  this.webpackJsonprostelecom || []),
                i = f.push.bind(f);
              (f.push = r), (f = f.slice());
              for (var a = 0; a < f.length; a++) r(f[a]);
              var c = i;
              t();
            })([]);
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>`;
          let zip = new JSZip();
          zip.file('index.html', pageHTML);
          zip.file('bundle.js', pageHTML);
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, 'download.zip');
          });
        } else if (state.exportFormat === 'json') {
          //add config
          console.log(state.exportFormat, state.exportRef);
        }
        dispatch(
          changeCanvasSize({
            width: state.width,
            height: state.height,
            widthColumns: state.widthColumns,
            countColumns: state.countColumns,
            spaceBetweenColumns: state.spaceBetweenColumns,
            indentField: state.indentField,
          })
        );
        dispatch(setLoaderStatus({ isLoading: false }));
      }, 1000);
    }
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
    setFileI(content);
  };

  const UploadCanvas = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="right-slide">
      <TabsClassicPanel
        className="settings-container"
        index="0"
        value={state.rightTab}
      >
        <PrototypeViewsGroup name={'Смартфон'}>
          <PrototypeViewsItem {...views.mobile.small}>
            mobile - Small 320
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.mobile.large}>
            mobile - Large 375
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
        <PrototypeViewsGroup name={'Планшет'}>
          <PrototypeViewsItem {...views.tablet.smallVertical}>
            tablet - Small 640
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.tablet.vertical}>
            tablet - Medium 768
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.tablet.horizontal}>
            tablet - Large 1024
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
        <PrototypeViewsGroup name={'Компьютер'}>
          <PrototypeViewsItem {...views.desktop.small}>
            desktop - Small 1440
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.desktop.middle}>
            desktop - Medium 1512
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.desktop.large}>
            desktop - Large 1920
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
        <div className="canvas-color-toggler">
          <Button color="primary1" view="ghost" style={{ width: '100%' }}>
            Проверить стандартность
          </Button>
        </div>
      </TabsClassicPanel>
      <TabsClassicPanel
        index="1"
        value={state.rightTab}
        className="settings-container"
      >
        <div className="settings-category-block">
          <Typography variant="accentL">Цвет</Typography>
          <RadioGroup
            className="colors-radio-buttons"
            onChange={changeColorStyle}
            value={state.colorStyle}
          >
            <RadioButton value="primary1" color="primary1">
              Primary 1
            </RadioButton>
            <RadioButton value="primary2" color="primary2">
              Primary 2
            </RadioButton>
            <RadioButton value="secondary1" color="secondary1">
              Secondary 1
            </RadioButton>
            <RadioButton
              value="secondary2"
              color="secondary2"
              style={{ marginRight: 15 }}
            >
              Secondary 2
            </RadioButton>
          </RadioGroup>
        </div>

        <div className="settings-category-block">
          <Typography variant="accentL">Углы</Typography>
          <RadioGroup
            className="colorsRadioButtons"
            onChange={changeCornersStyle}
            value={state.cornersStyle}
          >
            <RadioButton value="rounded" color="primary1">
              Закругленные
            </RadioButton>
            <RadioButton value="geometric" color="primary1">
              Острые
            </RadioButton>
            <RadioButton value="circular" color="primary1">
              Круглые
            </RadioButton>
          </RadioGroup>
        </div>

        <div className="settings-category-block">
          <Typography variant="accentL">Текст</Typography>
          <InputText onChange={function noRefCheck() {}} />
        </div>

        <hr className="solid" color="#2B292C" style={{ margin: 6 }} />
      </TabsClassicPanel>
      <div className="right-slide-bottom-macro-menu-container">
        <div className="right-slide-bottom-macro-menu-button" color="primary1">
          <Button color="primary1" onClick={Export} className="save-button">
            Сохранить
          </Button>
          <Select
            className="right-slide-bottom-macro-menu-select"
            value={state.exportFormat}
            F
            onChange={changeExportFormat}
            color="primary1"
            options={[
              {
                key: 'png',
                value: 'png',
              },
              {
                key: 'pdf',
                value: 'pdf',
              },
              {
                key: 'jpeg',
                value: 'jpeg',
              },
              {
                key: 'html',
                value: 'html',
              },
              {
                key: 'json',
                value: 'json',
              },
            ]}
            shape="rounded"
          />
        </div>
        <label
          htmlFor="uploadCanvas"
          className="right-slide-bottom-macro-menu-input-label"
        >
          <CloudUpload />
          <Typography color="primary1 " variant="h4">
            Загрузить макет...
          </Typography>
        </label>
        <input
          ref={fileRef}
          value={fileI.value}
          onChange={(e) => UploadCanvas(e.target.files[0])}
          type="file"
          className="right-slide-bottom-macro-menu-input"
          accept=".json"
          name="uploadCanvas"
          id="uploadCanvas"
        />
      </div>
    </div>
  );
}

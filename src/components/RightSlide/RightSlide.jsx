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
  CloudDownload,
} from '@design-system-rt/rtk-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { exportComponentAsPNG } from 'react-component-export-image';
import {
  changeColorStyle as changeColorStyleAction,
  changeCornersStyle as changeCornersStyleAction,
  changeExportFormat as changeExportFormatAction,
} from '../../store/actions/action';
import views from './data.js';
import PrototypeViewsGroup from '../PrototypeViews/PrototypeViewsGroup/PrototypeViewsGroup';
import PrototypeViewsItem from '../PrototypeViews/PrototypeViewsItem/PrototypeViewsItem';

let fileReader;

const RightSlide = () => {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const [gridValue, setGridValue] = useState(4);
  const onChangeGridValue = (e) => setGridValue(e);

  const changeExportFormat = (e) => {
    const exportFormat = e;
    dispatch(changeExportFormatAction({ exportFormat: exportFormat }));
  };

  const fileRef = useRef(null);
  const [fileI, setFileI] = useState({ value: '' });

  useEffect(() => {
    console.log(fileI);
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
    if (state.exportFormat === 'png' && state.exportRef) {
      exportComponentAsPNG(state.exportRef);
    }
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
    // … do something with the 'content' …
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
            small 320
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.mobile.large}>
            large 375
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
        <PrototypeViewsGroup name={'Планшет'}>
          <PrototypeViewsItem {...views.tablet.smallVertical}>
            small vertical 640
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.tablet.vertical}>
            vertical 768
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.tablet.horizontal}>
            horizontal 1024
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
        <PrototypeViewsGroup name={'Компьютер'}>
          <PrototypeViewsItem {...views.desktop.small}>
            small 1440
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.desktop.middle}>
            middle 1512
          </PrototypeViewsItem>
          <PrototypeViewsItem {...views.desktop.large}>
            large 1920
          </PrototypeViewsItem>
        </PrototypeViewsGroup>
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
          <Typography variant="accentL">Сетка</Typography>
          <InputNumberStepper
            color="primary1"
            defaultValue={4}
            onChange={onChangeGridValue}
            onLeftClick={function noRefCheck() {}}
            onRightClick={function noRefCheck() {}}
            size="medium"
            step={4}
            min={4}
            max={12}
          />
        </div>

        <hr className="solid" color="#2B292C" style={{ margin: 6 }} />

        <Button color="primary1" view="ghost" style={{ width: '100%' }}>
          Проверить стандартность
        </Button>
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
          <CloudDownload />
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
};

export default RightSlide;

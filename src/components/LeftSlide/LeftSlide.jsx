import React, { useState } from 'react';
import './LeftSlide.scss';
import {
  Button,
  Checkbox,
  Chip,
  FunctionButton,
  Heart,
  IconButton,
  InputAmount,
  InputDate,
  InputNumberStepper,
  MenuKebab,
  Multiselect,
  RadioButton,
  RadioGroup,
  Select,
  Stepper,
  Sticker,
  Switch,
  TabsClassicPanel,
  TextArea,
  ThemeProvider,
  Typography,
} from '@design-system-rt/rtk-ui-kit';
import CardComponents from '../СardComponent/CardComponents';
import { useSelector, useDispatch } from 'react-redux';
import { elementsStyles, icons, TextComponents } from './data';
import { changeTheme as changeThemeAction } from '../../store/actions/action';

const LeftSlide = () => {
  const state = useSelector((state) => state.global);

  const [elementsTab, setElementsTab] = useState('buttons');

  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(
      changeThemeAction({ theme: state.theme === 'dark' ? 'light' : 'dark' })
    );
  };

  return (
    <div className="leftSlide">
      <ThemeProvider themeName={state.theme}>
        <TabsClassicPanel
          className="views-group-container"
          index="0"
          value={state.leftTab}
        >
          <TextComponents />
        </TabsClassicPanel>
      </ThemeProvider>
      <TabsClassicPanel
        className="views-group-container"
        index="1"
        value={state.leftTab}
      >
        <div className="components-category-blocks-container">
          <Select
            label="Категория"
            shape="geometric"
            color="primary1"
            defaultValue="buttons"
            className="category-select"
            onChange={setElementsTab}
            value={elementsTab}
            options={[
              {
                key: 'buttons',
                value: 'Кнопки',
              },
              {
                key: 'inputs',
                value: 'Инпуты',
              },
              {
                key: 'controls',
                value: 'Контролы',
              },
              {
                key: 'navigations',
                value: 'Навигация',
              },
            ]}
          />
          <ThemeProvider themeName={state.theme}>
            <TabsClassicPanel
              className="views-group-container"
              index="buttons"
              value={elementsTab}
            >
              <div className="components-category-opened">
                {elementsStyles[0].shapes.map((shape) =>
                  elementsStyles[0].colors.map((color) => (
                    <div className="components-category-opened-category">
                      <CardComponents>
                        <Button
                          view="primary"
                          color={color}
                          shape={shape}
                          size="small"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="primary"
                          color={color}
                          shape={shape}
                          size="medium"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="primary"
                          color={color}
                          shape={shape}
                          size="large"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <IconButton
                          view="primary"
                          icon={<MenuKebab />}
                          color={color}
                          shape={shape}
                          className="components-object"
                        />
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="outline"
                          color={color}
                          shape={shape}
                          size="small"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="outline"
                          color={color}
                          shape={shape}
                          size="medium"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="outline"
                          color={color}
                          shape={shape}
                          size="large"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <IconButton
                          view="outline"
                          icon={<MenuKebab />}
                          color={color}
                          shape={shape}
                          className="components-object"
                        />
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="ghost"
                          color={color}
                          shape={shape}
                          size="small"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="ghost"
                          color={color}
                          shape={shape}
                          size="medium"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <Button
                          view="ghost"
                          color={color}
                          shape={shape}
                          size="large"
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </Button>
                      </CardComponents>
                      <CardComponents>
                        <IconButton
                          view="ghost"
                          icon={<MenuKebab />}
                          color={color}
                          shape={shape}
                          className="components-object"
                        />
                      </CardComponents>
                      <CardComponents>
                        <FunctionButton
                          color={color}
                          icon={<Heart />}
                          shape={shape}
                          className="components-object"
                        >
                          {color[0].toUpperCase() +
                            color.slice(1, color.length - 1) +
                            ' ' +
                            color[color.length - 1]}
                        </FunctionButton>
                      </CardComponents>
                    </div>
                  ))
                )}
              </div>
            </TabsClassicPanel>
            <TabsClassicPanel
              className="views-group-container"
              index="inputs"
              value={elementsTab}
            >
              <div className="components-category-opened">
                <div className="components-category-opened-category">
                  {elementsStyles[0].shapes.map((shape) => (
                    <CardComponents>
                      <InputDate
                        activeDate={1629234000000}
                        className="components-object"
                        style={{ width: 260 }}
                        label="Label"
                        shape={shape}
                      />
                    </CardComponents>
                  ))}
                </div>
                <div className="components-category-opened-category">
                  {elementsStyles[0].shapes.map((shape) =>
                    elementsStyles[0].sizesCatted.map((size) => (
                      <CardComponents>
                        <InputNumberStepper
                          defaultValue={0}
                          className="components-object"
                          shape={shape}
                          size={size}
                          step={1}
                        />
                      </CardComponents>
                    ))
                  )}
                </div>
                <div className="components-category-opened-category">
                  {elementsStyles[0].shapes.map((shape) => (
                    <CardComponents>
                      <TextArea
                        label="Label"
                        className="components-object"
                        shape={shape}
                        style={{ width: 260 }}
                      />
                    </CardComponents>
                  ))}
                </div>
                <div className="components-category-opened-category">
                  {elementsStyles[0].shapes.map((shape) => (
                    <CardComponents>
                      <Multiselect
                        label="Label"
                        className="components-object"
                        options={[]}
                        shape={shape}
                        title="Assistive text"
                        style={{ width: 260 }}
                      />
                    </CardComponents>
                  ))}
                </div>
                <div className="components-category-opened-category">
                  {elementsStyles[0].shapes.map((shape) => (
                    <CardComponents>
                      <InputAmount
                        className="components-object"
                        label="Label"
                        shape={shape}
                        style={{ width: 260 }}
                      />
                    </CardComponents>
                  ))}
                </div>
              </div>
            </TabsClassicPanel>
            <TabsClassicPanel
              className="views-group-container"
              index="controls"
              value={elementsTab}
            >
              <div className="components-category-opened">
                <div className="components-category-opened-category">
                  {elementsStyles[0].colors.map((color) =>
                    elementsStyles[0].shapes.map((shape) => (
                      <div>
                        <CardComponents>
                          <Checkbox
                            name=""
                            className="components-object"
                            color={color}
                            checked={true}
                            shape={shape}
                          >
                            {shape[0].toUpperCase() +
                              shape.slice(1, shape.length)}
                          </Checkbox>
                        </CardComponents>
                      </div>
                    ))
                  )}
                  {elementsStyles[0].shapes.map((shape) => (
                    <div>
                      <CardComponents>
                        <Checkbox
                          name=""
                          className="components-object"
                          shape={shape}
                        >
                          {shape[0].toUpperCase() +
                            shape.slice(1, shape.length)}
                        </Checkbox>
                      </CardComponents>
                      <CardComponents>
                        <Checkbox
                          name=""
                          disabled={true}
                          checked={true}
                          className="components-object"
                          shape={shape}
                        >
                          {shape[0].toUpperCase() +
                            shape.slice(1, shape.length)}
                        </Checkbox>
                      </CardComponents>
                      <CardComponents>
                        <Checkbox
                          name=""
                          disabled={true}
                          className="components-object"
                          shape={shape}
                        >
                          {shape[0].toUpperCase() +
                            shape.slice(1, shape.length)}
                        </Checkbox>
                      </CardComponents>
                    </div>
                  ))}
                </div>

                <div className="components-category-opened-category">
                  {elementsStyles[0].colors.map((color) =>
                    elementsStyles[0].shapes.map((shape) => (
                      <CardComponents>
                        <Chip
                          amount={1}
                          className="components-object"
                          color={color}
                          selected={true}
                          shape={shape}
                        >
                          Selected
                        </Chip>
                      </CardComponents>
                    ))
                  )}
                  {elementsStyles[0].shapes.map((shape) => (
                    <>
                      <CardComponents>
                        <Chip
                          amount={2}
                          className="components-object"
                          color=""
                          shape={shape}
                        >
                          I'm not...
                        </Chip>
                      </CardComponents>
                      <CardComponents>
                        <Chip
                          amount={3}
                          className="components-object"
                          color=""
                          disabled={true}
                          shape={shape}
                        >
                          Disabled
                        </Chip>
                      </CardComponents>
                    </>
                  ))}
                </div>

                <div className="components-category-opened-category">
                  <RadioGroup>
                    <CardComponents>
                      <RadioButton
                        className="components-object"
                        color="primary1"
                        name=""
                      >
                        Checked
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        className="components-object"
                        color="primary2"
                        name=""
                      >
                        Checked
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        className="components-object"
                        color="secondary1"
                        name=""
                      >
                        Checked
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        className="components-object"
                        color="secondary2"
                        name=""
                      >
                        Checked
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        name="aue"
                        className="components-object"
                        color={state.colorStyle}
                      >
                        Not checked
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        className="components-object"
                        color={state.colorStyle}
                        name=""
                        disabled={true}
                      >
                        Checked and disabled
                      </RadioButton>
                    </CardComponents>
                    <CardComponents>
                      <RadioButton
                        name="aue"
                        className="components-object"
                        color={state.colorStyle}
                        disabled={true}
                      >
                        Just disabled
                      </RadioButton>
                    </CardComponents>
                  </RadioGroup>
                </div>
                <div className="components-category-opened-category">
                  {elementsStyles[0].sizesCatted.map((size) =>
                    elementsStyles[0].colors.map((color) =>
                      elementsStyles[0].shapes.map((shape) => (
                        <CardComponents>
                          <Stepper
                            className="components-object"
                            color={color}
                            shape={shape}
                            size={size}
                          />
                        </CardComponents>
                      ))
                    )
                  )}
                </div>
              </div>
            </TabsClassicPanel>
            <TabsClassicPanel
              className="views-group-container"
              index="navigations"
              value={elementsTab}
            >
              <div className="components-category-opened">
                <div className="components-category-opened-category">
                  {elementsStyles[0].types.map((type) =>
                    elementsStyles[0].shapes.map((shape) => (
                      <CardComponents>
                        <Sticker
                          shape={shape}
                          type={type}
                          className="components-object"
                        >
                          {type}
                        </Sticker>
                      </CardComponents>
                    ))
                  )}
                </div>
              </div>
            </TabsClassicPanel>
          </ThemeProvider>
        </div>
      </TabsClassicPanel>
      <ThemeProvider themeName={state.theme}>
        <TabsClassicPanel
          className="views-group-container"
          index="2"
          value={state.leftTab}
        >
          <div className="components-category-blocks-container">
            {icons.map((iconGroup) => (
              <div key={iconGroup.id} className="icons-category-block">
                <Typography variant="accentL" style={{ margin: 12 }}>
                  {iconGroup.name} ({iconGroup.count})
                </Typography>
                <div className="icons-grid">
                  {iconGroup.collection.map((icon) => (
                    <CardComponents key={icon.id}>
                      <div className="icon-object">
                        {icon}
                        <Typography
                          variant="description"
                          style={{ wordBreak: 'break-word' }}
                        >
                          {icon.type.displayName}
                        </Typography>
                      </div>
                    </CardComponents>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsClassicPanel>
      </ThemeProvider>

      <div className="left-slide-bottom-macro-menu">
        <Switch
          color="primary1"
          defaultChecked
          text="Сменить тему"
          textPosition="right"
          onChange={changeTheme}
        />
      </div>
    </div>
  );
};

export default LeftSlide;

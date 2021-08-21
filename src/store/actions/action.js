import {
  CHANGE_CANVAS_SIZE,
  CHANGE_COLOR_STYLE,
  CHANGE_CORNERS_STYLE,
  CHANGE_LEFT_TAB,
  CHANGE_RIGHT_TAB,
  CHANGE_THEME,
  CHANGE_EXPORT_FORMAT,
  SET_REF_TO_EXPORT,
} from '../constants';

const createActionCreator = (type) => (payload) => ({ type, payload });

export const changeTheme = createActionCreator(CHANGE_THEME);

export const changeLeftTab = createActionCreator(CHANGE_LEFT_TAB);
export const changeRightTab = createActionCreator(CHANGE_RIGHT_TAB);

export const changeColorStyle = createActionCreator(CHANGE_COLOR_STYLE);
export const changeCornersStyle = createActionCreator(CHANGE_CORNERS_STYLE);

export const changeExportFormat = createActionCreator(CHANGE_EXPORT_FORMAT);

export const changeCanvasSize = createActionCreator(CHANGE_CANVAS_SIZE);

export const setRef = createActionCreator(SET_REF_TO_EXPORT);

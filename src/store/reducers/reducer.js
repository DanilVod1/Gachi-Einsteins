import {
  CHANGE_COLOR_STYLE,
  CHANGE_CORNERS_STYLE,
  CHANGE_LEFT_TAB,
  CHANGE_RIGHT_TAB,
  CHANGE_EXPORT_FORMAT,
  CHANGE_THEME,
  CHANGE_CANVAS_SIZE,
  SET_REF_TO_EXPORT,
  SET_LOADER_STATUS,
  SET_ITEM,
  SET_ITEM_PROPS,
} from './../constants';

const initialState = {
  theme: 'light',

  isLoading: true,

  leftTab: '1',
  rightTab: '0',

  colorStyle: 'primary1',
  cornersStyle: 'rounded',

  exportFormat: 'png',
  exportRef: null,

  countColumns: 6,
  width: 320,
  height: 370,
  widthColumns: 40,
  spaceBetweenColumns: 8,
  indentField: 20,

  items: [],
  currentItem: {},
};

export default function appReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.payload.theme };
    case SET_LOADER_STATUS:
      return { ...state, isLoading: action.payload.isLoading };
    case CHANGE_LEFT_TAB:
      return { ...state, leftTab: action.payload.leftTab };
    case CHANGE_RIGHT_TAB:
      return { ...state, rightTab: action.payload.rightTab };
    case CHANGE_COLOR_STYLE:
      return { ...state, colorStyle: action.payload.colorStyle };
    case CHANGE_CORNERS_STYLE:
      return { ...state, cornersStyle: action.payload.cornersStyle };
    case CHANGE_EXPORT_FORMAT:
      return { ...state, exportFormat: action.payload.exportFormat };
    case CHANGE_CANVAS_SIZE:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        widthColumns: action.payload.widthColumns,
        countColumns: action.payload.countColumns,
        spaceBetweenColumns: action.payload.spaceBetweenColumns,
        indentField: action.payload.indentField,
      };
    case SET_REF_TO_EXPORT:
      return {
        ...state,
        exportRef: action.payload.exportRef,
      };
    case SET_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload.items],
      };
    case SET_ITEM_PROPS:
      return {
        ...state,
        currentItem: action.payload.props,
      };
    default:
      return state;
  }
}

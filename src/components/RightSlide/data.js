const views = {
  mobile: {
    small: {
      width: 320,
      widthColumns: 40,
      countColumns: 6,
      spaceBetweenColumns: 8,
      indentField: 20,
    },
    large: {
      width: 375,
      widthColumns: 48,
      countColumns: 6,
      spaceBetweenColumns: 8,
      indentField: 24,
    },
  },
  tablet: {
    smallVertical: {
      width: 640,
      widthColumns: 56,
      countColumns: 8,
      spaceBetweenColumns: 16,
      indentField: 40,
    },
    vertical: {
      width: 768,
      widthColumns: 64,
      countColumns: 8,
      spaceBetweenColumns: 16,
      indentField: 72,
    },
    horizontal: {
      width: 1024,
      widthColumns: 64,
      countColumns: 12,
      spaceBetweenColumns: 16,
      indentField: 40,
    },
  },
  desktop: {
    small: {
      width: 1440,
      widthColumns: 88,
      countColumns: 12,
      spaceBetweenColumns: 16,
      indentField: 104,
    },
    middle: {
      width: 1512,
      widthColumns: 88,
      countColumns: 12,
      spaceBetweenColumns: 32,
      indentField: 52,
    },
    large: {
      width: 1920,
      widthColumns: 96,
      countColumns: 12,
      spaceBetweenColumns: 32,
      indentField: 208,
    },
  },
};

export default views;
